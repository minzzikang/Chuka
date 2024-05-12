package com.luckyseven.funding.repository;

import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingResult;
import com.luckyseven.funding.entity.FundingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface FundingRepository extends JpaRepository<Funding, Integer> {
    @Query("SELECT f FROM Funding f WHERE f.eventId = :eventId AND f.status IN :statuses ORDER BY f.result ASC")
    List<Funding> findByEventIdAndStatusInSorted(Integer eventId, Collection<FundingStatus> statuses);
    List<Funding> findAllByUserId(String userId);
    List<Funding> findAllByEventId(Integer eventId);
    Integer countByEventIdAndStatusIn(Integer eventId, Collection<FundingStatus> statuses);
    List<Funding> findByResultAndEndDateBefore(FundingResult fundingResult, LocalDate now);
    @Query("SELECT f FROM Funding f WHERE f.status = :status AND f.result = :result AND f.endDate = :today")
    List<Funding> findDdayFundings(FundingStatus status, FundingResult result, LocalDate today);
}
