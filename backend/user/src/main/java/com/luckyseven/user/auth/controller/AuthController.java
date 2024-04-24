package com.luckyseven.user.auth.controller;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.auth.service.AuthService;
import com.luckyseven.user.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/auth/test")
    public void test() {
        log.info("test!!!!!");
    }

    @GetMapping("/auth/login")
    public void login(@RequestParam String code,
                      HttpServletResponse response,
                      @Value("${kakao.api.redirect.front}") String redirectUri)
            throws IOException {
//        String redirect_uri="http://www.google.com";
//        response.sendRedirect(redirect_uri);

        int statusCode;
        HttpHeaders responseHeaders = new HttpHeaders();

        String token = authService.getToken(code);
        KakaoUserDto userInfo = authService.getUserInfo(token);


        if (!userService.isExistUser(String.valueOf(userInfo.getId()))) {
            authService.join(userInfo);
            statusCode = 201;
        }

        String accessToken = authService.login(userInfo);
        responseHeaders.set("Authorization", "Bearer " + accessToken);



        response.setHeader("Authorization", "Bearer " + accessToken);
        response.sendRedirect(redirectUri);

//        return ResponseEntity.status(200).headers(responseHeaders).body(null);
    }

//    @PostMapping("/auth/reissue")
//    public ResponseEntity<?> reissueRefreshToken() {
//
//
//    }

    @GetMapping("/auth/logout")
    public ResponseEntity<?> logout() throws IOException {

        log.info("logout!!");

        return ResponseEntity.status(200).body(null);
    }
}

