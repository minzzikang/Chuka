package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByEventId(int eventId);
    List<Event> findByUserId(String userId);

}
