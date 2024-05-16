package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import com.luckyseven.event.rollsheet.dto.EditEventDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface EventService {

    EventDto createEvent(CreateEventDto eventDto, String userId, String nickname) throws EmptyFileException, BigFileException, NotValidExtensionException, IOException;
    EventDto getEvent(int eventId);

    List<EventDto> getMyEvents(String userId, int page, int pageSize, boolean upcoming, String word);
    @Deprecated List<EventDto> getPublicEvents(boolean isAsc, int page, int pageSize);
    List<EventDto> getPublicEvents(String order, String sort, int page, int pageSize);
    List<EventDto> getEventsUserParticipatedIn(String userId, int page, int pageSize, String word);

    EventDto editEvent(EditEventDto eventDto, int eventId, String userId) throws EmptyFileException, IOException, NotValidExtensionException, BigFileException;
    void deleteEvent(int eventId) throws UnsupportedOperationException;
    boolean isMyEvent(int eventId, String userId);

    int countEvent();
    int countPublicEvent();
    int countMyEvent(String userId);
    int countMyUpcomingEvent(String userId);
    int countMyUpcomingEventSearch(String userId, String word);
    int countMyEventSearch(String userId, String word);
    int countParticipantEvent(String userId);
    int countParticipantEventSearch(String userId, String word);

    void sendDdayalarm() throws IOException;
    ResponseEntity<?> sendDdayalarmTest() ;

    void reloadProfanityData();

    void exceptionTest();
}
