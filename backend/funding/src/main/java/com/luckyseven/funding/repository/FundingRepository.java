package com.luckyseven.funding.repository;

import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingResult;
import com.luckyseven.funding.entity.FundingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FundingRepository extends JpaRepository<Funding, Integer> {
    @Query("SELECT f FROM Funding f WHERE f.eventId = :eventId AND f.status = :status ORDER BY f.result")
    List<Funding> findByEventIdAndStatusOrderByResultAsc(FundingStatus status, @Param("eventId") int eventId);
    List<Funding> findAllByUserId(String userId);
    List<Funding> findAllByEventId(Integer eventId);
    Integer countByEventIdAndStatus(Integer eventId, FundingStatus fundingStatus);
    List<Funding> findByResultAndEndDateBefore(FundingResult fundingResult, LocalDate now);
    @Query("SELECT f FROM Funding f WHERE f.status = :status AND f.result = :result AND f.endDate = :today")
    List<Funding> findDdayFundings(FundingStatus status, FundingResult result, LocalDate today);
}
