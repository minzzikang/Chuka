package com.luckyseven.user.auth.controller;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.auth.service.AuthService;
import com.luckyseven.user.user.service.UserService;
import com.luckyseven.user.util.jwt.JWTUtil;
import io.jsonwebtoken.Jwts;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth", description = "인증 API")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final JWTUtil jwtUtil;

    @GetMapping("/test")
    public void test() {
        log.info("test!!!!!");
    }
    @GetMapping("/token/{token}")
    public ResponseEntity<?> ttest(@PathVariable("token") String token) {
        try {

        log.info("token!!!!!");
        jwtUtil.validateToken(token);
            return ResponseEntity.ok().body("유효함");
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

    }

    @GetMapping("/login")
    @Operation(summary = "로그인 및 회원가입", description = "사용자가 카카오 로그인 및 회원가입을 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인"),
            @ApiResponse(responseCode = "201", description = "회원가입"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
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
    @Operation(summary = "AccessToken 재발급", description = "RefreshToken으로 AccessToken을 재발급한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
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
    @Operation(summary = "로그아웃", description = "사용자 로그아웃")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> logout(
            @Parameter(hidden = true) @RequestHeader("Authorization") String authorization) throws IOException {
        log.info("logout start!!");
        String accessToken = authorization.substring("Bearer ".length());
        authService.logout(accessToken);

        return ResponseEntity.status(200).body(null);
    }
}


