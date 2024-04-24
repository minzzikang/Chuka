package com.luckyseven.funding.funding.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.luckyseven.funding.funding.entity.fundingStatus;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@ToString
public class FundingCreateDto {
    private int eventId;

    private String productLink;

    private String introduce;

    private int goalAmount;

    private String option;

    private String receiverName;

    private String receiverPhone;

    private String postalCode;

    private String address;

    private String addressDetail;

    private LocalDate endDate;
}
