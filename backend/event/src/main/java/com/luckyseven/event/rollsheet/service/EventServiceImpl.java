package com.luckyseven.event.rollsheet.service;

import com.github.f4b6a3.ulid.UlidCreator;
import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import com.luckyseven.event.rollsheet.entity.Event;
import com.luckyseven.event.rollsheet.entity.EventType;
import com.luckyseven.event.rollsheet.entity.Theme;
import com.luckyseven.event.rollsheet.repository.EventRepository;
import com.luckyseven.event.util.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final FileService fileService;

    private final EventRepository eventRepository;

    @Override
    public EventDto createEvent(CreateEventDto eventDto) throws EmptyFileException, BigFileException, NotValidExtensionException {
        Event event = new Event();
        event.setUserId(eventDto.getUserId());
        event.setPageUri(UlidCreator.getUlid().toString());
        event.setType(EventType.valueOf(eventDto.getType()));
        event.setTitle(eventDto.getTitle());
        event.setDate(eventDto.getDate());
//        event.setBanner(eventDto.getBanner());
        //TODO: 썸네일 생성 후 setBannerThumbnail() 호출
        //TODO: imageUpload 메소드 배너 원본 이미지, 썸네일 이미지 주소 배열 리턴으로 수정
        String[] bannerPath = fileService.uploadBannerImageToAmazonS3(eventDto.getBannerImage());
        // 썸네일
        //  event.setBannerThumbnail();
        event.setTheme(Theme.valueOf(eventDto.getTheme()));
        event.setVisibility(eventDto.getVisibility());
        event.setCreateTime(LocalDateTime.now());

        return EventDto.of(eventRepository.save(event));
    }


}
