package com.luckyseven.event.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(description = "리뷰 생성 Dto")
public class CreateReviewDto {

    @Schema(description = "내용")
    private String content;

    @Schema(description = "핸드폰 번호")
    private String phoneNumber;

}
