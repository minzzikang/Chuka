package com.luckyseven.notification.dto;

import com.luckyseven.notification.message.dto.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FundingStatusAlarmDto {
    private String userId;
    private Integer fundingId;
    private Topic topic;
}
