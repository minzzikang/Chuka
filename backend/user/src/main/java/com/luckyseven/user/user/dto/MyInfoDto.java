package com.luckyseven.user.user.dto;

import com.luckyseven.user.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Schema(description = "내 정보 Dto")
public class MyInfoDto {

    @Schema(description = "사용자 id")
    private String userId;

    @Schema(description = "닉네임")
    private String nickname;

    @Schema(description = "프로필 이미지 uri")
    private String profileImage;

    @Schema(description = "가입일")
    private LocalDateTime joinDate;

    public static MyInfoDto of(User user) {
        MyInfoDto userDto = new MyInfoDto();
        userDto.setUserId(user.getUserId());
        userDto.setNickname(user.getNickname());
        userDto.setJoinDate(user.getJoinDate());
        userDto.setProfileImage(user.getProfileImage());

        return userDto;
    }

}
