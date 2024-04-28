package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.entity.JoinEvent;
import com.luckyseven.event.rollsheet.entity.JoinEventPk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinEventRepository extends JpaRepository<JoinEvent, JoinEventPk> {

}
