package com.luckyseven.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FundingCompleteAlarmDto {

    private String userId;
    private Integer fundingId;
}
