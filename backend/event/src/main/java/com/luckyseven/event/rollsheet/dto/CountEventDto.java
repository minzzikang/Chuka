package com.luckyseven.event.rollsheet.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(description = "이벤트 개수 Dto")
public class CountEventDto {

    @Schema(description = "이벤트 개수")
    int eventCnt;

    @Schema(description = "축하 메시지 개수")
    int msgCnt;

}
