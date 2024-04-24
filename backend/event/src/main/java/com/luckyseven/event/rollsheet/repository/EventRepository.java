package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByEventId(String eventId);

}
