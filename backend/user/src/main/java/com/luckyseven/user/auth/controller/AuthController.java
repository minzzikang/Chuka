package com.luckyseven.user.auth.controller;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.auth.service.AuthService;
import com.luckyseven.user.user.service.UserService;
import com.luckyseven.user.util.jwt.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

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
    public ResponseEntity<?> test() {
        return ResponseEntity.status(200).body("test");
    }

    @DeleteMapping("/fcm-token")
    public ResponseEntity<?> deleteInvalidFcmtoken(@RequestBody() String fcmtoken) {
        try {
            log.info(" ** deleteInvalidFcmtoken!!!!!");
            authService.deleteByFcmToken(fcmtoken);

            return ResponseEntity.ok().body("Invalid Fcmtoken 삭제");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/token/{token}")
    public ResponseEntity<?> tokenTest(@PathVariable("token") String token) {
        try {
            jwtUtil.validateToken(token);
            return ResponseEntity.ok().body("유효함");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/login/kakao")
    @Operation(summary = "로그인 및 회원가입", description = "사용자가 카카오 로그인 및 회원가입을 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인"),
            @ApiResponse(responseCode = "201", description = "회원가입"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<KakaoUserDto> login(@RequestBody String code) {
        int statusCode = 200;
        HttpHeaders responseHeaders = new HttpHeaders();

        try {
            String token = authService.getKakaoToken(code);
            KakaoUserDto userInfo = authService.getKakaoUserInfo(token);

            if (!userService.isExistUser(String.valueOf(userInfo.getId()))) {
                authService.join(userInfo);
                statusCode = 201;
            } else {
                authService.updateProfileImage(userInfo);
            }

            String accessToken = authService.issueAccessToken(userInfo);
            String refreshToken = authService.issueRefreshToken(userInfo);

            responseHeaders.set("Authorization", "Bearer " + accessToken);
            responseHeaders.set("Refresh-Token", "Bearer " + refreshToken);

            log.debug("accessToken: {}", accessToken);
            log.debug("refreshToken: {}", refreshToken);

            return ResponseEntity.status(statusCode).headers(responseHeaders).body(userInfo);
        } catch (HttpClientErrorException e) {
            log.error("--- KAKAO LOGIN FAILED ---");
            return ResponseEntity.status(400).headers(responseHeaders).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(400).headers(responseHeaders).body(null);
        }

    }

    @PostMapping("/reissue")
    @Operation(summary = "AccessToken 재발급", description = "RefreshToken으로 AccessToken을 재발급한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "401", description = "토큰 인증 실패"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> reissueRefreshToken(
            @Parameter(hidden = true) @RequestHeader("Authorization") String authorization
    ) {
        try {
            String refreshToken = authorization.substring("Bearer ".length());

            String newAccessToken = null;
            try {
                newAccessToken = authService.reIssueAccessTokenWithRefreshToken(refreshToken);
            } finally {
                if (newAccessToken == null) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid token");
                }
            }

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("Authorization", "Bearer " + newAccessToken);

            log.debug("reissue accessToken: {}", newAccessToken);

            return ResponseEntity.status(200).headers(responseHeaders).body(null);
        } catch (Exception e) {

            return ResponseEntity.status(400).body("access-token 발급 실패");
        }
    }

}


