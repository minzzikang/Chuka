package com.luckyseven.event.rollsheet.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "롤링페이퍼 리스트 Dto")
public class RollSheetListRes {

    @Schema(description = "총 개수")
    int totalCnt;
    @Schema(description = "롤링페이퍼 리스트")
    List<RollSheetDto> rollSheetList;

}
