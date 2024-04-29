package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.FundingJoinReq;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.Sponsor;
import com.luckyseven.funding.repository.SponsorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SponsorServiceImpl implements SponsorService{
    private final SponsorRepository sponsorRepository;
    @Override
    public int joinFunding(int fundingId, FundingJoinReq dto, String userId) {
        final Sponsor data = Sponsor.builder()
                .funding(Funding.builder().fundingId(fundingId).build())
                .userId(userId)
                .amount(dto.getAmount())
                .nickname(dto.getNickname())
                .comment(dto.getComment())
                .build();
        final Sponsor result = sponsorRepository.save(data);
        return result.getSponsorId();
    }
}
