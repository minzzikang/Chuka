package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateRollSheetDto;
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
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RollSheetServiceImpl implements RollSheetService {

    private final EventRepository eventRepository;
    private final RollSheetRepository rollSheetRepository;

    private final FileService fileService;

    @Override
    public RollSheet createRollSheet(CreateRollSheetDto rollSheetDto, String userId, int eventId) throws EmptyFileException, IOException, NotValidExtensionException, BigFileException {
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
            String[] imagePath = fileService.uploadBannerImageToAmazonS3(rollSheetDto.getBackgroundImage());
            rollSheet.setBackgroundImage(imagePath[0]);
            rollSheet.setBackgroundImageThumbnail(imagePath[1]);
        }

        log.info("rollSheet: {}", rollSheet);

        return rollSheetRepository.save(rollSheet);
    }

    @Override
    public List<RollSheet> getRollSheetListWithEventId(int eventId) {
        if (eventRepository.findByEventId(eventId) == null) {
            throw new NoSuchElementException();
        }

        List<RollSheet> rollSheets = rollSheetRepository.findByEventId(eventId);

        log.info("rollSheets: {}", rollSheets);

        return rollSheets;
    }

    @Override
    public void deleteByEventId(int eventId) {
        rollSheetRepository.deleteAllByEventId(eventId);
    }
}
