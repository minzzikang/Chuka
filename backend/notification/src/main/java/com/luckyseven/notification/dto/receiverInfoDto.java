package com.luckyseven.notification.dto;

import com.luckyseven.notification.documents.NotificationType;
import lombok.Data;

@Data
public class receiverInfoDto {

    private String userId;
    private NotificationType type;

}
