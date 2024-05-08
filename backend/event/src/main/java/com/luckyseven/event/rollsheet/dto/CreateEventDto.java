package com.luckyseven.event.rollsheet.dto;

import com.luckyseven.event.rollsheet.entity.EventType;
import com.luckyseven.event.rollsheet.entity.Theme;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Schema(description = "이벤트 생성 Dto")
public class CreateEventDto {

    @Schema(description = "이벤트 종류")
    private EventType type;

    @Schema(description = "이벤트 제목")
    private String title;

    @Schema(description = "이벤트 날짜")
    private LocalDate date;

    @Schema(description = "테마")
    private Theme theme;

    @Schema(description = "공개여부")
    private Boolean visibility;

    @Schema(description = "배너 이미지 파일")
    private MultipartFile bannerImage;
}
