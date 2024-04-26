package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateRollSheetDto;
import com.luckyseven.event.rollsheet.dto.RollSheetDto;
import com.luckyseven.event.rollsheet.entity.RollSheet;
import com.luckyseven.event.rollsheet.repository.EventRepository;
import com.luckyseven.event.rollsheet.repository.RollSheetRepository;
import com.luckyseven.event.util.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RollSheetServiceImpl implements RollSheetService {

    private final EventRepository eventRepository;
    private final RollSheetRepository rollSheetRepository;

    private final FileService fileService;

    private final int ROLL_SHEET_IMAGE_WIDTH = 1080;
    private final int ROLL_SHEET_IMAGE_HEIGHT = 2400;

    @Override
    public RollSheetDto createRollSheet(CreateRollSheetDto rollSheetDto, String userId, int eventId) throws EmptyFileException, IOException, NotValidExtensionException, BigFileException {
        if (eventRepository.findByEventId(eventId) == null) {
            throw new NoSuchElementException();
        }
        RollSheet rollSheet = new RollSheet();
        rollSheet.setEventId(eventId);
        rollSheet.setUserId(userId);
        rollSheet.setShape(rollSheetDto.getShape());
        rollSheet.setBackgroundColor(rollSheetDto.getBackgroundColor());
        rollSheet.setContent(rollSheetDto.getContent());
        rollSheet.setFont(rollSheetDto.getFont());
        rollSheet.setFontColor(rollSheetDto.getFontColor());
        rollSheet.setNickname(rollSheetDto.getNickname());
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

        return result;
    }

    @Override
    public List<RollSheetDto> getRollSheetListWithEventId(int eventId) {
        if (eventRepository.findByEventId(eventId) == null) {
            throw new NoSuchElementException();
        }

        List<RollSheetDto> results = rollSheetRepository.findByEventId(eventId).stream()
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
}
