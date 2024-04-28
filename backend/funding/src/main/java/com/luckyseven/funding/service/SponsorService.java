package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.FundingJoinReq;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

public interface SponsorService {
    int joinFunding(int fundingId, FundingJoinReq dto, String userId);
}
