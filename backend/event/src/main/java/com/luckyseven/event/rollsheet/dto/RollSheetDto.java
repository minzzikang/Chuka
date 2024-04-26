package com.luckyseven.event.rollsheet.dto;

import com.luckyseven.event.rollsheet.entity.Font;
import com.luckyseven.event.rollsheet.entity.RollSheet;
import com.luckyseven.event.rollsheet.entity.Shape;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Schema(description = "롤링페이퍼 Dto")
public class RollSheetDto {

    @Schema(description = "롤링페이퍼 id")
    private String rollSheetId;

    @Schema(description = "이벤트 id")
    private Integer eventId;

    @Schema(description = "유저 id")
    private String userId;

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

    @Schema(description = "배경사진")
    private String backgroundImage;

    @Schema(description = "배경사진 썸네일")
    private String backgroundImageThumbnail;

    @Schema(description = "배경사진 url")
    private String backgroundImageUrl;

    @Schema(description = "배경사진 썸네일 url")
    private String backgroundImageThumbnailUrl;

    @Schema(description = "닉네임")
    private String nickname;

    @Schema(description = "작성시간")
    private LocalDateTime createTime;

    public static RollSheetDto of(RollSheet rollSheet) {
        RollSheetDto dto = new RollSheetDto();
        dto.setRollSheetId(rollSheet.getRollSheetId());
        dto.setEventId(rollSheet.getEventId());
        dto.setUserId(rollSheet.getUserId());
        dto.setShape(rollSheet.getShape());
        dto.setBackgroundColor(rollSheet.getBackgroundColor());
        dto.setContent(rollSheet.getContent());
        dto.setFont(rollSheet.getFont());
        dto.setFontColor(rollSheet.getFontColor());
        dto.setBackgroundImage(rollSheet.getBackgroundImage());
        dto.setBackgroundImageThumbnail(rollSheet.getBackgroundImageThumbnail());
        dto.setNickname(rollSheet.getNickname());
        dto.setCreateTime(rollSheet.getCreateTime());
        return dto;
    }

}
