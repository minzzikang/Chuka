package com.luckyseven.funding.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Schema(description = "이벤트 Dto")
public class EventDto {

    @Schema(description = "이벤트 id")
    private int eventId;

    @Schema(description = "사용자 id")
    private String userId;

    @Schema(description = "페이지 uri")
    private String pageUri;

    @Schema(description = "이벤트 종류")
    private EventType type;

    @Schema(description = "이벤트 제목")
    private String title;

    @Schema(description = "이벤트 날짜")
    private LocalDate date;

    @Schema(description = "이미지")
    private String banner;

    @Schema(description = "이미지(썸네일)")
    private String bannerThumbnail;

    @Schema(description = "이미지 url")
    private String bannerUrl;

    @Schema(description = "이미지(썸네일) url")
    private String bannerThumbnailUrl;

    @Schema(description = "테마")
    private Theme theme;

    @Schema(description = "공개여부")
    private Boolean visibility;

    @Schema(description = "생성시각")
    private LocalDateTime createTime;
}
