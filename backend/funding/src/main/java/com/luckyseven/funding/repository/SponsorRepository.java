package com.luckyseven.funding.repository;

import com.luckyseven.funding.entity.Sponsor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SponsorRepository extends JpaRepository<Sponsor, Integer> {
    @Query("SELECT SUM(s.amount) FROM Sponsor s WHERE s.funding.id = :fundingId")
    Integer sumAmountByFundingId(@Param("fundingId") int fundingId);
}
