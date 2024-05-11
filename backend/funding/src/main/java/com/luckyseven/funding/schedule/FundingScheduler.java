package com.luckyseven.funding.schedule;

import com.luckyseven.funding.dto.FundingToNotificationDto;
import com.luckyseven.funding.dto.Topic;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingResult;
import com.luckyseven.funding.entity.FundingStatus;
import com.luckyseven.funding.entity.Sponsor;
import com.luckyseven.funding.message.ProducerService;
import com.luckyseven.funding.repository.FundingRepository;
import com.luckyseven.funding.repository.SponsorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class FundingScheduler {
    private final FundingRepository fundingRepository;
    private final SponsorRepository sponsorRepository;
    private final ProducerService producerService;

    /**
     * 매일 자정에 ONGOING인 result중에서 기한을 지난 것이 있으면 COMPLETE로 변경
     * 이거 사실은 fail처리라서 알림X 펀딩 성공처리는 SponsorServiceImpl에 있습니당!
     */
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void updateFundingResults() {
        LocalDate now = LocalDate.now();
        List<Funding> fundings = fundingRepository.findByResultAndEndDateBefore(FundingResult.ONGOING, now);
        for (Funding funding : fundings) {
            funding.setResult(FundingResult.COMPLETE);
        }
        fundingRepository.saveAll(fundings);
    }

    /**
     * Dday 펀딩에서도 작성해야하는줄 알고 만들어버림 주석처리할게용~~
     */
//    @Async
//    @Scheduled(cron = "0 0 9 * * ?")
//    @Transactional
//    public void checkDdayFundings() {
//        LocalDate today = LocalDate.now();
//        List<Funding> fundings = fundingRepository.findDdayFundings(FundingStatus.APPROVE, FundingResult.ONGOING, today);
//        Set<FundingToNotificationDto> notificationSet = new HashSet<>();
//
//        for (Funding funding : fundings) {
//            notificationSet.add(new FundingToNotificationDto(funding.getUserId(), funding.getFundingId(), Topic.DDAY_ALARM));
//            for (Sponsor sponsor : funding.getSponsorList()) {
//                if(sponsor.getUserId()!=null){
//                    notificationSet.add(new FundingToNotificationDto(sponsor.getUserId(), funding.getFundingId(), Topic.DDAY_ALARM));
//                }
//            }
//        }
////        for (FundingToNotificationDto notificationDto : notificationSet) {
////            producerService.sendFundingStatusMessage(notificationDto);
////        }
//    }

}
