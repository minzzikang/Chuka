package com.luckyseven.funding.repository;

import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FundingRepository extends JpaRepository<Funding, Integer> {
    List<Funding> findAllByEventIdAndStatus(Integer eventId, FundingStatus status);
    List<Funding> findAllByUserId(String userId);
    List<Funding> findAllByEventId(Integer eventId);
    Integer countByEventId(Integer eventId);
}
