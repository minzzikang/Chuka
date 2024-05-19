package com.luckyseven.event.rollsheet.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class RollingpaperCreatAlarmDto {
    private int eventId;
    private String  userId;
    private String  pageUri;
    private String  eventTitle;
}
