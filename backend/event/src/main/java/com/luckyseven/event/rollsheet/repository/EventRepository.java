package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByEventId(int eventId);
    List<Event> findByUserId(String userId);
    int countByVisibility(boolean visibility);
    int countByUserId(String userId);
    int countByUserIdAndDateGreaterThanEqual(String userId, LocalDate date);
    int countByUserIdAndDateGreaterThanEqualAndTitleContaining(String userId, LocalDate date, String title);
    int countByUserIdAndTitleContaining(String userId, String title);

}
