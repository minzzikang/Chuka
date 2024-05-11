package com.luckyseven.funding.dto;

import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;


@Getter
@ToString
@RequiredArgsConstructor
public class FundingDetailRes implements Serializable {
    private final Integer fundingId;
    private final String nickname;
    private final String userId;
    private final Integer eventId;
    private final LocalDate eventDate;
    private final String eventTitle;
    private final FundingStatus status;
    private final String productName;
    private final String productImage;
    private final String productLink;
    private final Integer dDay;
    private final Integer goalAmount;
    private final Integer remainAmount;
    private final String introduce;
    private final List<SponsorRes> sponsors;

    public static FundingDetailRes of(final Funding funding, final int nowFundingAmount, final List<SponsorRes> sponsors, final LocalDate date, final String title) {
        return new FundingDetailRes(
                funding.getFundingId(),
                funding.getReceiverName(),
                funding.getUserId(),
                funding.getEventId(),
                date,
                title,
                funding.getStatus(),
                funding.getProductName(),
                funding.getProductImage(),
                funding.getProductLink(),
                (int) Math.max(0, ChronoUnit.DAYS.between(LocalDate.now(), funding.getEndDate())),
                funding.getGoalAmount(),
                Math.max(funding.getGoalAmount() - nowFundingAmount, 0),
                funding.getIntroduce(),
                sponsors

        );
    }
}


