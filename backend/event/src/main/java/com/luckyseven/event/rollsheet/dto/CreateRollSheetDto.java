package com.luckyseven.event.rollsheet.dto;

import com.luckyseven.event.rollsheet.entity.Font;
import com.luckyseven.event.rollsheet.entity.Shape;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
@Schema(description = "롤링페이퍼 Dto")
public class CreateRollSheetDto {

    @Schema(description = "모양")
    private Shape shape;

    @Schema(description = "배경색상")
    private String backgroundColor;

    @Schema(description = "내용")
    private String content;

    @Schema(description = "폰트")
    private Font font;

    @Schema(description = "폰트색상")
    private String fontColor;

    @Schema(description = "닉네임")
    private String nickname;

    @Schema(description = "배경사진")
    private MultipartFile backgroundImage;

}
