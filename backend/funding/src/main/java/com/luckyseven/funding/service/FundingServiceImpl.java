package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.FundingCreateReq;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.repository.FundingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FundingServiceImpl implements FundingService{
    private final FundingRepository fundingRepository;

    @Override
    public int createFunding(FundingCreateReq dto) {
        Funding data = Funding.builder()
                .eventId(dto.getEventId())
                .productLink(dto.getProductLink())
                .introduce(dto.getIntroduce())
                .goalAmount(dto.getGoalAmount())
                .option(dto.getOption())
                .receiverName(dto.getReceiverName())
                .receiverPhone(dto.getReceiverPhone())
                .postalCode(dto.getPostalCode())
                .address(dto.getAddress())
                .addressDetail(dto.getAddressDetail())
                .endDate(dto.getEndDate())
                .build();
        Funding result = fundingRepository.save(data);
        return result.getFundingId();
    }

    @Override
    public List<Funding> findFundings(int eventId){
        List<Funding> tmp= fundingRepository.findAllByEventId(eventId);
        log.info(tmp.toString());
        return null;
    }
}
