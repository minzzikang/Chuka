package com.luckyseven.user.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(description = "FcmToken Dto")
public class FcmTokenDto {

    @Schema(description = "fcmToken")
    String fcmToken;

}
