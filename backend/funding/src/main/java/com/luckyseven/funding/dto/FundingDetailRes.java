package com.luckyseven.funding.dto;

import com.luckyseven.funding.entity.Funding;
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
    private final LocalDate eventDate;
    private final String eventTitle;
    private final String productImage;
    private final Integer dDay;
    private final Integer goalAmount;
    private final Integer remainAmount;
    private final String introduce;
    private final List<SponsorRes> sponsors;

    public static FundingDetailRes of(final Funding funding, final int nowFundingAmount, final List<SponsorRes> sponsors, final LocalDate date, final String title) {
        return new FundingDetailRes(
                funding.getFundingId(),
                date,
                title,
                funding.getProductImage(),
                (int) ChronoUnit.DAYS.between(LocalDate.now(), funding.getEndDate()),
                funding.getGoalAmount(),
                Math.max(funding.getGoalAmount() - nowFundingAmount, 0),
                funding.getIntroduce(),
                sponsors

        );
    }
}


