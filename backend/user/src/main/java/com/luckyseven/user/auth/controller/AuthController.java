package com.luckyseven.user.auth.controller;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.auth.service.AuthService;
import com.luckyseven.user.user.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/test")
    public void test() {
        log.info("test!!!!!");
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String code, HttpServletResponse response,
                                   @Value("${kakao.api.redirect.front}") String redirectUri) throws IOException {
        int statusCode = 200;
        HttpHeaders responseHeaders = new HttpHeaders();

        String token = authService.getKakaoToken(code);
        KakaoUserDto userInfo = authService.getKakaoUserInfo(token);

        if (!userService.isExistUser(String.valueOf(userInfo.getId()))) {
            authService.join(userInfo);
            statusCode = 201;
        }

        String accessToken = authService.issueAccessToken(userInfo);
        String refreshToken = authService.issueRefreshToken(userInfo);
        responseHeaders.set("Authorization", "Bearer " + accessToken);
        responseHeaders.set("Refresh-Token", "Bearer " + refreshToken);

        log.info("accessToken: {}", accessToken);
        log.info("refreshToken: {}", refreshToken);

//        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.sendRedirect(redirectUri);

        return ResponseEntity.status(statusCode).headers(responseHeaders).body(userInfo);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissueRefreshToken(
            @Parameter(hidden = true) @RequestHeader("Authorization") String authorization)
    {
        String refreshToken = authorization.substring("Bearer ".length());

        String newAccessToken = authService.reIssueAccessTokenWithRefreshToken(refreshToken);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Authorization", "Bearer " + newAccessToken);

        log.info("accessToken: {}", newAccessToken);

        return ResponseEntity.status(200).headers(responseHeaders).body(null);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorization) throws IOException {
        log.info("logout start!!");
        String accessToken = authorization.substring("Bearer ".length());
        authService.logout(accessToken);

        return ResponseEntity.status(200).body(null);
    }
}

