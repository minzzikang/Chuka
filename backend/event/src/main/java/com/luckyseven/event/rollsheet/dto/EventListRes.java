package com.luckyseven.event.rollsheet.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "이벤트 리스트 Dto")
public class EventListRes {

    @Schema(description = "총 개수")
    int totalCnt;
    @Schema(description = "이벤트 리스트")
    List<EventDto> eventList;

}
