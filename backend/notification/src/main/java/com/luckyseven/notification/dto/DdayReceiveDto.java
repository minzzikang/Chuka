package com.luckyseven.notification.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@ToString
@Schema(description = "D-day event MQ Request")
public class DdayReceiveDto {
    private List<String> joinMembers;
    private String creater;
    private String pageUri;
    private String title;
    private Integer eventId;

    public DdayReceiveDto() {
    }
}
