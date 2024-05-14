package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.user.dto.UserDto;

public interface AuthService {

    String getKakaoToken(String code);
    KakaoUserDto getKakaoUserInfo(String token);

    UserDto join(KakaoUserDto userDto);
    void updateProfileImage(KakaoUserDto userDto);

    String issueAccessToken(KakaoUserDto userDto);
    String issueRefreshToken(UserDto userDto);
    String issueRefreshToken(KakaoUserDto userDto);
    String reIssueAccessTokenWithRefreshToken(String refreshToken);


    void deleteByFcmToken(String fcmtoken);
}
