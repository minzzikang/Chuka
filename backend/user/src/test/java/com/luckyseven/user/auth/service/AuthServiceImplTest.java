package com.luckyseven.user.auth.service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource("classpath:/application.properties")
class AuthServiceImplTest {

    AuthService authService = new AuthServiceImpl();

    @Test
    void getToken() {
        authService.getToken("FsNL6rJ3DEqBIPOtybtQTTThaunMDUT7Xol5SnC9IzJ8JOiMWltRBTaR2oUKPXTaAAABjwlf1qgWphHJzwXJqw");
    }
}