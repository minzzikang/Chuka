package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;

public interface AuthService {

    String getToken(String code);
    KakaoUserDto getUserInfo(String token);
    String joinOrLoginForKakao(KakaoUserDto userDto);

}
