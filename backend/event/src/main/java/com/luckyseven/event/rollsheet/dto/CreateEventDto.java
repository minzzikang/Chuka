package com.luckyseven.event.rollsheet.dto;

import com.luckyseven.event.rollsheet.entity.EventType;
import com.luckyseven.event.rollsheet.entity.Theme;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Schema(description = "이벤트 생성 Dto")
public class CreateEventDto {

    @Schema(description = "사용자 id")
    private String userId;

    @Schema(description = "이벤트 종류")
    private EventType type;

    @Schema(description = "이벤트 제목")
    private String title;

    @Schema(description = "이벤트 날짜")
    private LocalDate date;

    @Schema(description = "이미지")
    private String banner;

    @Schema(description = "테마")
    private Theme theme;

    @Schema(description = "공개여부")
    private Boolean visibility;

}
