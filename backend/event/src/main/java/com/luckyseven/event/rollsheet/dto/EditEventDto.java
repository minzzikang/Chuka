package com.luckyseven.event.rollsheet.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Schema(description = "이벤트 수정 Dto")
public class EditEventDto {

    @Schema(description = "이벤트 제목")
    private String title;

    @Schema(description = "이벤트 날짜")
    private LocalDate date;

    @Schema(description = "공개여부")
    private Boolean visibility;

    @Schema(description = "배너 이미지 파일")
    private MultipartFile bannerImage;

}
