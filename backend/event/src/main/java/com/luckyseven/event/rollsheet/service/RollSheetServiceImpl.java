package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateRollSheetDto;
import com.luckyseven.event.rollsheet.dto.RollSheetDto;
import com.luckyseven.event.rollsheet.dto.RollingpaperCreatAlarmDto;
import com.luckyseven.event.rollsheet.entity.Event;
import com.luckyseven.event.rollsheet.entity.JoinEvent;
import com.luckyseven.event.rollsheet.entity.JoinEventPk;
import com.luckyseven.event.rollsheet.entity.RollSheet;
import com.luckyseven.event.rollsheet.repository.EventQueryRepository;
import com.luckyseven.event.rollsheet.repository.EventRepository;
import com.luckyseven.event.rollsheet.repository.JoinEventRepository;
import com.luckyseven.event.rollsheet.repository.RollSheetRepository;
import com.luckyseven.event.util.FileService;
import com.luckyseven.event.util.ProfanityFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RollSheetServiceImpl implements RollSheetService {

    private final EventRepository eventRepository;
    private final EventQueryRepository eventQueryRepository;
    private final RollSheetRepository rollSheetRepository;
    private final JoinEventRepository joinEventRepository;

    private final FileService fileService;

    private final ProfanityFilter profanityFilter;

    private final int ROLL_SHEET_IMAGE_WIDTH = 1080;
    private final int ROLL_SHEET_IMAGE_HEIGHT = 2400;

    @Override
    public RollSheetDto createRollSheet(CreateRollSheetDto rollSheetDto, String userId, int eventId) throws EmptyFileException, IOException, NotValidExtensionException, BigFileException {
        Event event = eventRepository.findByEventId(eventId);
        if (event == null) {
            throw new NoSuchElementException();
        }

        event.setRollingPaperCnt(event.getRollingPaperCnt()+1);
        eventRepository.save(event);

        RollSheet rollSheet = new RollSheet();
        rollSheet.setEventId(eventId);
        rollSheet.setUserId(userId);
        rollSheet.setShape(rollSheetDto.getShape());
        rollSheet.setBackgroundColor(rollSheetDto.getBackgroundColor());
        rollSheet.setContent(profanityFilter.changeWithDeafultDelimiter(rollSheetDto.getContent()));
        rollSheet.setFont(rollSheetDto.getFont());
        rollSheet.setFontColor(rollSheetDto.getFontColor());
        rollSheet.setNickname(profanityFilter.changeWithDeafultDelimiter(rollSheetDto.getNickname()));
        rollSheet.setCreateTime(LocalDateTime.now());

        if (rollSheetDto.getBackgroundImage() != null) {
            String[] imagePath = fileService.uploadImageWithThumbnailToAmazonS3(rollSheetDto.getBackgroundImage(), "rollSheet", ROLL_SHEET_IMAGE_WIDTH, ROLL_SHEET_IMAGE_HEIGHT);
            rollSheet.setBackgroundImage(imagePath[0]);
            rollSheet.setBackgroundImageThumbnail(imagePath[1]);
        }

        RollSheetDto result = RollSheetDto.of(rollSheetRepository.save(rollSheet));
        if (result.getBackgroundImage() != null && result.getBackgroundImageThumbnail() != null) {
            result.setBackgroundImageUrl(fileService.getImageUrl(result.getBackgroundImage()));
            result.setBackgroundImageThumbnailUrl(fileService.getImageUrl(result.getBackgroundImageThumbnail()));
        }

        log.info("joinEvent 등록");
        log.info("userId: {}, event.getUserId: {}, userId: {}", userId, event.getUserId(), userId);
        // joinEvent 등록
        if (userId != null && !userId.isEmpty() && !event.getUserId().equals(userId)) {
            JoinEvent joinEvent = new JoinEvent();
            joinEvent.setJoinEventPK(new JoinEventPk(event, userId));
            joinEventRepository.save(joinEvent);
        }

        return result;
    }

    @Override
    public List<RollSheetDto> getRollSheetListWithEventId(int eventId, int page, int size) {
        if (eventRepository.findByEventId(eventId) == null) {
            throw new NoSuchElementException();
        }

        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        Pageable pageable = PageRequest.of(page, size, sort);

        List<RollSheetDto> results = rollSheetRepository.findByEventId(eventId, pageable).stream()
                .map(rollSheet -> {
                    RollSheetDto tmp = RollSheetDto.of(rollSheet);
                    if (rollSheet.getBackgroundImage() != null) {
                        tmp.setBackgroundImageUrl(fileService.getImageUrl(rollSheet.getBackgroundImage()));
                        tmp.setBackgroundImageThumbnailUrl(fileService.getImageUrl(rollSheet.getBackgroundImageThumbnail()));
                    }
                    return tmp;
                })
                .collect(Collectors.toList());

        log.info("rollSheets: {}", results);

        return results;
    }

    @Override
    public RollSheetDto getRollSheet(String rollSheetId) throws NoSuchElementException {
        RollSheet rollSheet = rollSheetRepository.findByRollSheetId(rollSheetId);
        if (rollSheet == null) {
            throw new NoSuchElementException();
        }

        RollSheetDto result = RollSheetDto.of(rollSheet);
        if (rollSheet.getBackgroundImage() != null) {
            result.setBackgroundImageUrl(fileService.getImageUrl(rollSheet.getBackgroundImage()));
            result.setBackgroundImageThumbnailUrl(fileService.getImageUrl(rollSheet.getBackgroundImageThumbnail()));
        }

        return result;
    }

    /**
     * @param userId 요청한 유저
     * @param rollSheetId 롤링페이퍼 아이디
     * @return 내가 작성한 롤링페이퍼이거나, 내 이벤트에 작성된 롤링페이퍼인지 확인
     */
    @Override
    public boolean isMyRollSheet(String userId, String rollSheetId) {
        RollSheet rollSheet = rollSheetRepository.findByRollSheetId(rollSheetId);

        if (rollSheet == null || rollSheet.getUserId().isBlank()) {
            return false;
        }

        // 내 이벤트이면
        Event event = eventRepository.findByEventId(rollSheet.getEventId());
        if (event.getUserId().equals(userId)) {
            return true;
        }

        return rollSheet.getUserId().equals(userId);
    }

    @Override
    public void deleteRollSheet(String rollSheetId) {
        RollSheet rollSheet = rollSheetRepository.findByRollSheetId(rollSheetId);

        rollSheetRepository.deleteById(rollSheetId);

        Event event = eventRepository.findByEventId(rollSheet.getEventId());
        event.setRollingPaperCnt(event.getRollingPaperCnt() - 1);
        eventRepository.save(event);
    }

    @Override
    public void deleteByRollSheetId(String rollSheetId) {
        RollSheet rollSheet = rollSheetRepository.findByRollSheetId(rollSheetId);
        fileService.deleteBackgroundImageOnAmazonS3(rollSheetId);
        rollSheetRepository.delete(rollSheet);
    }

    @Override
    public void deleteAllByEventId(int eventId) {
        // 이미지 삭제
        for (RollSheet rollSheet : rollSheetRepository.findByEventId(eventId)) {
            fileService.deleteBackgroundImageOnAmazonS3(rollSheet.getRollSheetId());
        }

        rollSheetRepository.deleteAllByEventId(eventId);
    }

    @Override
    public int countRollSheet() {
        return Math.toIntExact(rollSheetRepository.count());
    }

    @Override
    public int countRollSheetByEventId(int eventId) {
        return rollSheetRepository.countByEventId(eventId);
    }

    @Override
    public RollingpaperCreatAlarmDto findByEventId(int eventId) {

        RollingpaperCreatAlarmDto rollingpaperCreatAlarmDto = eventQueryRepository.findByEventId(eventId);

        return rollingpaperCreatAlarmDto;
    }
}
