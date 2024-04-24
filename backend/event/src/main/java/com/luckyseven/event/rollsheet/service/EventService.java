package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EventService {

    EventDto createEvent(CreateEventDto eventDto) throws EmptyFileException, BigFileException, NotValidExtensionException;
}
