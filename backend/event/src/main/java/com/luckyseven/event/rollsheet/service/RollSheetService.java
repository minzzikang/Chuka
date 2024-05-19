package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateRollSheetDto;
import com.luckyseven.event.rollsheet.dto.RollSheetDto;
import com.luckyseven.event.rollsheet.dto.RollingpaperCreatAlarmDto;
import com.luckyseven.event.rollsheet.entity.Event;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

public interface RollSheetService {

    RollSheetDto createRollSheet(CreateRollSheetDto rollSheetDto, String userId, int eventId) throws EmptyFileException, BigFileException, NotValidExtensionException, IOException;
    List<RollSheetDto> getRollSheetListWithEventId(int eventId, int page, int size) throws NoSuchElementException;
    RollSheetDto getRollSheet(String rollSheetId) throws NoSuchElementException;
    boolean isMyRollSheet(String userId, String rollSheetId);
    void deleteRollSheet(String rollSheetId);

    void deleteByRollSheetId(String rollSheetId);
    void deleteAllByEventId(int eventId);

    int countRollSheet();
    int countRollSheetByEventId(int eventId);

    RollingpaperCreatAlarmDto findByEventId(int eventId);
}
