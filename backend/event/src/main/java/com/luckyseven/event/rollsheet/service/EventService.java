package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import com.luckyseven.event.rollsheet.dto.EventDto;

public interface EventService {

    EventDto createEvent(CreateEventDto eventDto);
}
