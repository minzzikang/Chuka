package com.luckyseven.funding.repository;

import com.luckyseven.funding.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FundingRepository extends JpaRepository<Funding, Integer> {
    List<Funding> findAllByEventId(Integer eventId);
}
