package com.luckyseven.funding.dto;

import lombok.*;

import java.time.LocalDate;
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FundingCreateReq {
    private Integer eventId;

    private String productLink;

    private String introduce;

    private Integer goalAmount;

    private String option;

    private String receiverName;

    private String receiverPhone;

    private String postalCode;

    private String address;

    private String addressDetail;

    private LocalDate endDate;
}
