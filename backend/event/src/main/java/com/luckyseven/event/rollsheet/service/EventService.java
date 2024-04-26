package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import com.luckyseven.event.rollsheet.dto.EditEventDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import com.luckyseven.event.rollsheet.entity.Event;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EventService {

    EventDto createEvent(CreateEventDto eventDto, String userId) throws EmptyFileException, BigFileException, NotValidExtensionException, IOException;
    EventDto getEvent(int eventId);
    EventDto editEvent(EditEventDto eventDto, int eventId, String userId) throws EmptyFileException, IOException, NotValidExtensionException, BigFileException;
    void deleteEvent(int eventId) throws UnsupportedOperationException;
    boolean isMyEvent(int eventId, String userId);

}
