package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.FundingCreateReq;
import com.luckyseven.funding.entity.Funding;

import java.util.List;

public interface FundingService {
    int createFunding(FundingCreateReq dto);

    List<Funding> findFundings(int eventId);
}
