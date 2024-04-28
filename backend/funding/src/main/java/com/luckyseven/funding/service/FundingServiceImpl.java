package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.FundingCreateReq;
import com.luckyseven.funding.dto.FundingDetailRes;
import com.luckyseven.funding.dto.FundingRes;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingResult;
import com.luckyseven.funding.entity.FundingStatus;
import com.luckyseven.funding.repository.FundingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FundingServiceImpl implements FundingService {
    private final FundingRepository fundingRepository;

    @Override
    public int createFunding(final FundingCreateReq dto) {
        final Funding data = Funding.builder()
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
        final Funding result = fundingRepository.save(data);
        return result.getFundingId();
    }

    @Override
    public List<FundingRes> findFundings(final int eventId) {
        final List<Funding> fundingList = fundingRepository.findAllByEventIdAndStatus(eventId, FundingStatus.AFTER);

        return fundingList.stream()
                .map(funding -> {
                    //각 펀딩 아이디에 맞는 현재 펀딩 금액을 디비에서 불러오기 현재는 임시로 100000으로 설정
                    //디비에서 계산해서 불러와야하나? 쭉 불러와서 백엔드에서 계산해야하나?
                    int currentFundingAmount = 100000;
                    LocalDate nowDate = LocalDate.now();
                    boolean isGoal = currentFundingAmount >= funding.getGoalAmount();
                    boolean isFundingPeriod = !nowDate.isAfter(funding.getEndDate());
                    FundingResult fundingResult;

                    if (isGoal)
                        fundingResult = FundingResult.SUCCESS;
                    else {
                        if (isFundingPeriod)
                            fundingResult = FundingResult.ONGOING;
                        else
                            fundingResult = FundingResult.COMPLETE;
                    }
                    return FundingRes.of(funding, fundingResult);
                })
                .toList();
    }

    @Override
    public FundingDetailRes getFunding(final int fundingId){
        final Funding funding = fundingRepository.findById(fundingId)
                .orElseThrow();
        return new FundingDetailRes(
                funding.getFundingId(),
                LocalDate.now(),
                "이벤트타이틀하드코딩",
                funding.getProductImage(),
                (int) ChronoUnit.DAYS.between(LocalDate.now(),funding.getEndDate()),
                funding.getGoalAmount(),
                0, //펀딩에 참여한사람 금액 모아야해서 하드코딩
                funding.getIntroduce()
        );
    }
}
