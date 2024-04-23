package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
//@TestPropertySource("classpath:/application.properties")
class AuthServiceImplTest {

    AuthService authService;

    @Test
    void getToken() {
        authService.getToken("FsNL6rJ3DEqBIPOtybtQTTThaunMDUT7Xol5SnC9IzJ8JOiMWltRBTaR2oUKPXTaAAABjwlf1qgWphHJzwXJqw");
    }

    @Test
    void joinOrLoginForKakao() {
        KakaoUserDto dto = new KakaoUserDto();
        dto.setId(3448548097L);
        dto.setConnectedAt("2024-04-23T08:57:58Z");
        authService.joinOrLoginForKakao(dto);
    }
}