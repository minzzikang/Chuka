package com.luckyseven.event.rollsheet.service;

import com.github.f4b6a3.ulid.UlidCreator;
import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.message.ProducerService;
import com.luckyseven.event.message.dto.BaseMessageDto;
import com.luckyseven.event.message.dto.Topic;
import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import com.luckyseven.event.rollsheet.dto.DdayReceiveDto;
import com.luckyseven.event.rollsheet.dto.EditEventDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import com.luckyseven.event.rollsheet.entity.Event;
import com.luckyseven.event.rollsheet.repository.EventQueryRepository;
import com.luckyseven.event.rollsheet.repository.EventRepository;
import com.luckyseven.event.rollsheet.repository.JoinEventRepository;
import com.luckyseven.event.rollsheet.repository.RollSheetRepository;
import com.luckyseven.event.util.FileService;
import com.luckyseven.event.util.ProfanityFilter;
import com.luckyseven.event.util.feign.FundingFeignClient;
import feign.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final FileService fileService;
    private final ProducerService producerService;

    private final EventRepository eventRepository;
    private final EventQueryRepository eventQueryRepository;
    private final JoinEventRepository joinEventRepository;
    private final RollSheetRepository rollSheetRepository;

    private final FundingFeignClient fundingFeignClient;

    private final ProfanityFilter profanityFilter;

    private final int BANNER_WIDTH = 1080;
    private final int BANNER_HEIGHT = 220;

    @Override
    public EventDto createEvent(CreateEventDto eventDto, String userId, String nickname) throws EmptyFileException, BigFileException, NotValidExtensionException, IOException {
        log.info("createEvent: {}", eventDto);
        Event event = new Event();
        event.setUserId(userId);
        event.setNickname(nickname);
        event.setPageUri(UlidCreator.getUlid().toString());
        event.setType(eventDto.getType());
        event.setTitle(profanityFilter.changeWithDeafultDelimiter(eventDto.getTitle()));
        event.setDate(eventDto.getDate());
        //Amazon S3에 배너 이미지 업로드 후 경로 저장
        if (eventDto.getBannerImage() != null) {
            String[] bannerPath = fileService.uploadImageWithThumbnailToAmazonS3(eventDto.getBannerImage(), "banner", BANNER_WIDTH, BANNER_HEIGHT);
            event.setBanner(bannerPath[0]);
            event.setBannerThumbnail(bannerPath[1]);
        }
        event.setTheme(eventDto.getTheme());
        event.setVisibility(eventDto.getVisibility());
        event.setCreateTime(LocalDateTime.now());

        return EventDto.of(eventRepository.save(event));
    }

    @Override
    public EventDto getEvent(int eventId) {
        EventDto event = EventDto.of(eventRepository.findByEventId(eventId));

        // 이미지 uri
        if (event.getBanner() != null && event.getBannerThumbnail() != null) {
            event.setBannerUrl(fileService.getImageUrl(event.getBanner()));
            event.setBannerThumbnailUrl(fileService.getImageUrl(event.getBannerThumbnail()));
        }

        return event;
    }

    @Override
    public List<EventDto> getMyEvents(String userId, int page, int pageSize, boolean upcoming, String word) {
        List<EventDto> events = eventQueryRepository.getMyEvents(userId, page, pageSize, upcoming, word);
        for (EventDto eventDto : events) {
            if (eventDto.getBanner() != null && eventDto.getBannerThumbnail() != null) {
                eventDto.setBannerUrl(fileService.getImageUrl(eventDto.getBanner()));
                eventDto.setBannerThumbnailUrl(fileService.getImageUrl(eventDto.getBannerThumbnail()));
            }
        }

        return events;
    }

    @Override
    public List<EventDto> getPublicEvents(boolean isAsc, int page, int pageSize) {
        List<EventDto> events = eventQueryRepository.getPublicEventsByCreateTime(isAsc, page, pageSize);
        for (EventDto eventDto : events) {
            if (eventDto.getBanner() != null && eventDto.getBannerThumbnail() != null) {
                eventDto.setBannerUrl(fileService.getImageUrl(eventDto.getBanner()));
                eventDto.setBannerThumbnailUrl(fileService.getImageUrl(eventDto.getBannerThumbnail()));
            }
        }

        return events;
    }

    @Override
    public List<EventDto> getPublicEvents(String order, String sort, int page, int pageSize) {
        List<EventDto> events;
        if (sort.equals("participants")) {
            // 롤링페이퍼 개수
            events = eventQueryRepository.getPublicEventsByRollingPaperCounts(sort, page, pageSize);
        } else {
            events = eventQueryRepository.getPublicEventsByCreateTime(order, page, pageSize);
        }

        for (EventDto eventDto : events) {
            if (eventDto.getBanner() != null && eventDto.getBannerThumbnail() != null) {
                eventDto.setBannerUrl(fileService.getImageUrl(eventDto.getBanner()));
                eventDto.setBannerThumbnailUrl(fileService.getImageUrl(eventDto.getBannerThumbnail()));
            }
        }

        return events;
    }
//    @Override @Deprecated
//    public List<EventDto> getPublicEvents(String order, String sort, int page, int pageSize) {
//        List<EventDto> events;
//        if (sort.equals("participants")) {
//            events = eventQueryRepository.getPublicEventsByParticipants(sort, page, pageSize);
//        } else {
//            events = eventQueryRepository.getPublicEventsByCreateTime(order, page, pageSize);
//        }
//
//        for (EventDto eventDto : events) {
//            if (eventDto.getBanner() != null && eventDto.getBannerThumbnail() != null) {
//                eventDto.setBannerUrl(fileService.getImageUrl(eventDto.getBanner()));
//                eventDto.setBannerThumbnailUrl(fileService.getImageUrl(eventDto.getBannerThumbnail()));
//            }
//        }
//
//        return events;
//    }

    /**
     * 내가 참여한 기록이 있는 이벤트 조회
     */
    @Override
    public List<EventDto> getEventsUserParticipatedIn(String userId, int page, int pageSize, String word) {
        List<EventDto> events = eventQueryRepository.getEventsUserParticipatedIn(userId, page, pageSize, word);
        for (EventDto eventDto : events) {
            if (eventDto.getBanner() != null && eventDto.getBannerThumbnail() != null) {
                eventDto.setBannerUrl(fileService.getImageUrl(eventDto.getBanner()));
                eventDto.setBannerThumbnailUrl(fileService.getImageUrl(eventDto.getBannerThumbnail()));
            }
        }

        return events;
    }

    @Override
    public EventDto editEvent(EditEventDto eventDto, int eventId, String userId) throws EmptyFileException, IOException, NotValidExtensionException, BigFileException {
        log.info("editEvent start: {}", eventDto);
        Event event = eventRepository.findByEventId(eventId);
        event.setDate(eventDto.getDate());
        event.setTitle(profanityFilter.changeWithDeafultDelimiter(eventDto.getTitle()));
        event.setVisibility(eventDto.getVisibility());
        if (event.getBanner() != null) {
            fileService.deleteBannerImageOnAmazonS3(eventId);
        }

        if (eventDto.getBannerImage() != null) {
            String[] bannerPath = fileService.uploadImageWithThumbnailToAmazonS3(eventDto.getBannerImage(), "banner", BANNER_WIDTH, BANNER_HEIGHT);
            event.setBanner(bannerPath[0]);
            event.setBannerThumbnail(bannerPath[1]);
        }

        EventDto result = EventDto.of(eventRepository.save(event));
        if (result.getBanner() != null) {
            result.setBannerUrl(fileService.getImageUrl(event.getBanner()));
            result.setBannerThumbnailUrl(fileService.getImageUrl(event.getBannerThumbnail()));
        }

        return result;
    }

    @Override
    public void deleteEvent(int eventId) {
        Event event = eventRepository.findByEventId(eventId);

        if (event == null) {
            throw new NoSuchElementException();
        }

        // 롤링페이퍼 1개 이상 작성되면 삭제 불가
        int count = rollSheetRepository.countByEventId(eventId);

        if (count > 0) {
            log.info("number of rolling papers: {}", count);
            throw new UnsupportedOperationException("rolling paper already written");
        }

        // 펀딩이 모금된 상태이면 삭제 불가
        Response response = fundingFeignClient.deleteFundingByEventId(eventId);
        log.info("response: {}", response);
        if (response.status() != HttpStatus.SC_OK) {
            if (response.body() != null) {
                log.info("response body: {}", response.body());
            }

            switch (response.status()) {
                case HttpStatus.SC_FORBIDDEN -> throw new UnsupportedOperationException("funding has been raised");
                case HttpStatus.SC_NOT_FOUND -> throw new UnsupportedOperationException("funding NOT FOUND");
                default -> throw new UnsupportedOperationException("delete funding error");
            }
        }

        if (event.getBanner() != null) {
            fileService.deleteBannerImageOnAmazonS3(eventId);
        }
        eventRepository.delete(event);
    }

    @Override
    public boolean isMyEvent(int eventId, String userId) {
        Event event = eventRepository.findByEventId(eventId);
        return event.getUserId().equals(userId);
    }

    @Override
    public int countEvent() {
        return Math.toIntExact(eventRepository.count());
    }

    @Override
    public int countPublicEvent() {
        return eventRepository.countByVisibility(true);
    }

    @Override
    public int countMyEvent(String userId) {
        return eventRepository.countByUserId(userId);
    }

    @Override
    public int countMyUpcomingEvent(String userId) {
        return eventRepository.countByUserIdAndDateGreaterThanEqual(userId, LocalDate.now());
    }

    @Override
    public int countMyUpcomingEventSearch(String userId, String word) {
        return eventRepository.countByUserIdAndDateGreaterThanEqualAndTitleContaining(userId, LocalDate.now(), word);
    }

    @Override
    public int countMyEventSearch(String userId, String word) {
        return eventRepository.countByUserIdAndTitleContaining(userId, word);
    }

    @Override
    public int countParticipantEvent(String userId) {
        return joinEventRepository.countByJoinEventPKUserId(userId);
    }

    @Override
    public int countParticipantEventSearch(String userId, String word) {
        return eventQueryRepository.getParticipantEventSearchCount(userId, word);
    }

    /**
     * 매일 9시에 당일이 이벤트 오픈인 이벤트의 생성자와 참여자 정보를
     * 알림 서버에 보낸다.
     *
     * @throws IOException
     */
    @Async
    @Override
    @Scheduled(cron = "0 0 10 * * ?")
    public void sendDdayalarm() throws IOException {
//        log.info("실행되었는가?");
        List<DdayReceiveDto> userIdList = eventQueryRepository.findAllByCurdate();

        if(userIdList.isEmpty()) return;

        BaseMessageDto baseMessageDto = new BaseMessageDto();
        baseMessageDto.setData(userIdList);
        baseMessageDto.setTopic(Topic.DDAY_ALARM);

        producerService.sendNotificationMessage(baseMessageDto);

    }

    @Override
    public ResponseEntity<?> sendDdayalarmTest() {
        List<DdayReceiveDto> userIdList = eventQueryRepository.findAllByCurdateTest();

        BaseMessageDto baseMessageDto = new BaseMessageDto();
        baseMessageDto.setData(userIdList);
        baseMessageDto.setTopic(Topic.DDAY_ALARM);

        if(userIdList.isEmpty()) return ResponseEntity.ok().build();

        producerService.sendNotificationMessage(baseMessageDto);
        return ResponseEntity.ok().body(userIdList);
    }

    @Override
    public void reloadProfanityData() {
        profanityFilter.reloadProfanityData();
    }

}
