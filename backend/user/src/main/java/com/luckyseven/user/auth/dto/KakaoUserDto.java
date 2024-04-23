package com.luckyseven.user.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoUserDto {

    private Long id;
    private String connectedAt;
    private Properties properties;
    private KakaoAcount kakaoAcount;

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
