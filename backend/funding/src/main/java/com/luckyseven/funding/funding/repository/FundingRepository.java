package com.luckyseven.funding.funding.repository;

import com.luckyseven.funding.funding.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FundingRepository extends JpaRepository<Funding, Integer> {
}
