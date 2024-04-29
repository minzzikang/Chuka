package com.luckyseven.funding.repository;

import com.luckyseven.funding.entity.Sponsor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SponsorRepository extends JpaRepository<Sponsor, Integer> {
}
