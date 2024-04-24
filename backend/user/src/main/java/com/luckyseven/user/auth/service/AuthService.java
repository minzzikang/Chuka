package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.user.dto.UserDto;

public interface AuthService {

    String getToken(String code);
    KakaoUserDto getUserInfo(String token);

    UserDto join(KakaoUserDto userDto);
    String login(KakaoUserDto userDto);

    String issueRefreshToken(UserDto userDto);
    String issueRefreshToken(KakaoUserDto userDto);

}
