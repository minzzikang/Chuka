package com.luckyseven.notification.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class FundingNotificationDto {
    private String notificationId;
    private String userId;
    private String content;
    private String createDateTime;
    private Integer fundingId ;
    private String type;
}
