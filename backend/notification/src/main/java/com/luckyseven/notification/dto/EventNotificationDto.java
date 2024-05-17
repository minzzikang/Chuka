package com.luckyseven.notification.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class EventNotificationDto {

    private String notificationId;
    private String userId;
    private String content;
    private String eventTitle;
    private String createDateTime;
    private String pageUri;
    private Integer eventId ;
    private String type;
}
