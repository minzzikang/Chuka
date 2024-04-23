package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;

public interface AuthService {

    public String test(String test);

    public String getToken(String code);
    public KakaoUserDto getUserInfo(String token);

}
