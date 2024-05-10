package com.luckyseven.event.rollsheet.dto;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class DdayReceiveDto {
    private List<String> joinMembers;
    private String creater;
    private String pageUri;
    private Integer eventId;
}
