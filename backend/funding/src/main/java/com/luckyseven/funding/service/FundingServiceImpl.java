package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.*;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingResult;
import com.luckyseven.funding.entity.FundingStatus;
import com.luckyseven.funding.entity.Sponsor;
import com.luckyseven.funding.message.ProducerService;
import com.luckyseven.funding.repository.FundingRepository;
import com.luckyseven.funding.util.EventFeignClient;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;

import static com.luckyseven.funding.dto.FundingCreateReq.getNullPropertyNames;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FundingServiceImpl implements FundingService {
    private final FundingRepository fundingRepository;
    private final EventFeignClient eventFeignClient;
    private final ProducerService producerService;

    @Override
    public int createFunding(final FundingCreateReq dto, String userId) {
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
                .userId(userId)
                .build();
        final Funding result = fundingRepository.save(data);
        producerService.sendCrawlingMessage(result.getFundingId(),result.getProductLink());
        return result.getFundingId();
    }

    @Override
    public List<FundingRes> findFundings(final int eventId) {
        final List<Funding> fundingList = fundingRepository.findAllByEventIdAndStatus(eventId, FundingStatus.AFTER);

        return fundingList.stream()
                .map(funding -> {
                    int currentFundingAmount = funding.getSponsorList().stream()
                            .mapToInt(Sponsor::getAmount)
                            .sum();
                    LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul"));
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
    public FundingDetailRes getFunding(final int fundingId) {
        final Funding funding = fundingRepository.findById(fundingId)
                .orElseThrow(() -> new NoSuchElementException(fundingId+"에 해당하는 펀딩이 없습니다."));
        List<Sponsor> sponsorList = funding.getSponsorList();
        List<SponsorRes> sponsorsResList = sponsorList.stream()
                .map(sponsor -> SponsorRes.of(sponsor, "프로필이미지"))
                .toList();
        final int nowFundingAmount = sponsorList.stream()
                .mapToInt(Sponsor::getAmount)
                .sum();
        EventDto eventDto = eventFeignClient.getEvent(funding.getEventId());

        return FundingDetailRes.of(funding, nowFundingAmount, sponsorsResList, eventDto.getDate(), eventDto.getTitle());
    }

    @Override
    public List<FundingRes> getMyFunding(String userId) {
        final List<Funding> fundingList = fundingRepository.findAllByUserId(userId);

        return fundingList.stream()
                .map(funding -> {
                    int currentFundingAmount = funding.getSponsorList().stream()
                            .mapToInt(Sponsor::getAmount)
                            .sum();
                    LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul"));
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
    @Deprecated
    public Funding modifyFunding(final int fundingId, final FundingCreateReq dto, String userId) throws EntityNotFoundException, IllegalAccessException{
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(EntityNotFoundException::new);

        //작성자와 수정을 시도하려는 사람의 ID 일치 여부 확인
        if(!userId.equals(funding.getUserId())) {
            throw new IllegalAccessException();
        }

        dto.setEventId(funding.getEventId());                                   //eventId는 변조되어서는 안됨
        BeanUtils.copyProperties(dto, funding, getNullPropertyNames(dto));      //null인 Field 제외하고 값 복사

        funding = fundingRepository.save(funding);

        return funding;
    }
}
