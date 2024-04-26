package com.luckyseven.funding.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDate;


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


}


