package com.luckyseven.notification.dto;

import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RollingpaperCreatAlarmDto {
    private int eventId;
    private String  userId;
    private String  pageUri;
    private String  eventTitle;
}
