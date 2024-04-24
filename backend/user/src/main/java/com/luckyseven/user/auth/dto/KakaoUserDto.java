package com.luckyseven.user.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.luckyseven.user.user.dto.UserDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class KakaoUserDto {

    private Long id;
    private LocalDateTime connectedAt;
    private Properties properties;
    private KakaoAcount kakaoAcount;

//    public static KakaoUserDto of(UserDto userDto) {
//        KakaoUserDto kakaoUserDto = new KakaoUserDto();
//        kakaoUserDto.setId(userDto.getUserId());
//        kakaoUserDto.setConnectedAt(userDto.getJoinDate());
//    }

    @Setter
    @Getter
    @ToString
    @RequiredArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Properties {
        private String nickname;
        private String profileImage;
        private String thumbnailImage;
    }

    @Setter
    @Getter
    @ToString
    @RequiredArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public class KakaoAcount {
        private Boolean profileNicknameNeedsAgrement;
        private Boolean profileImageNeedsAgreement;
        private Profile profile;
    }

    @Setter
    @Getter
    @ToString
    @RequiredArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public class Profile {
        private String nickname;
        private Boolean isDefaultNickname;
    }
}
