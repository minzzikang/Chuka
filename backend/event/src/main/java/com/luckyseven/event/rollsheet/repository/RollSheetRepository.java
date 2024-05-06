package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.entity.RollSheet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RollSheetRepository extends MongoRepository<RollSheet, String> {

    RollSheet findByRollSheetId(String rollSheetId);

    List<RollSheet> findByEventId(int eventId);

    Page<RollSheet> findByEventId(int rollSheetId, Pageable pageable);

    int countByEventId(int eventId);

    void deleteAllByEventId(int eventId);


}
