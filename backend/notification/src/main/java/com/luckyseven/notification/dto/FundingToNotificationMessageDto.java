package com.luckyseven.notification.dto;

import com.luckyseven.notification.documents.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FundingToNotificationMessageDto {
    private String userId;
    private String body;
    private NotificationType type;
    private Integer fundingId;
}
