package com.luckyseven.notification.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
@Schema(description = "D-day event MQ Request")
public class DdayReceiveDto {
    private List<String> joinMembers;
    private String creater;
    private Integer eventId;
}
