package com.luckyseven.user.user.controller;

import com.luckyseven.user.common.response.BaseResponseBody;
import com.luckyseven.user.user.dto.DeduplicatedUsersIdDto;
import com.luckyseven.user.user.dto.FcmTokenDto;
import com.luckyseven.user.user.dto.MyInfoDto;
import com.luckyseven.user.user.dto.UserDto;
import com.luckyseven.user.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Tag(name = "User", description = "회원 API")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(summary = "내 정보 조회", description = "내 정보를 조회한다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 사용자"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<MyInfoDto> getMyInfo(@RequestHeader("loggedInUser") String userId) {

        MyInfoDto myInfo = userService.getMyInfo(userId);

        if (myInfo == null) {

            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(myInfo);
    }

    @DeleteMapping("/me")
    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 사용자"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> deleteMyId(@RequestHeader("loggedInUser") String userId, @RequestHeader("Authentication") String token) {
        try {
            userService.deleteUser(userId, token);

            return ResponseEntity.status(200).body(null);
        } catch (Exception e) {
            log.error(e.getMessage());

            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping("/{userId}")
    @Operation(summary = "회원 정보 조회", description = "userId에 해당하는 회원 정보를 조회한다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 사용자"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<UserDto> getUserInfo(@PathVariable("userId") String userId) {
        try {
            UserDto userDto = userService.getUser(userId);

            if (userDto == null) {

                return ResponseEntity.status(404).body(null);
            }

            return ResponseEntity.status(200).body(userDto);
        } catch (Exception e) {
            log.error(e.getMessage());

            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/fcm-token")
    @Operation(summary = "fcm token 저장", description = "회원의 fcm token을 저장한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> saveFcmToken(
            @RequestBody FcmTokenDto fcmToken, @RequestHeader("loggedInUser") String userId
    ) {
        try {
            userService.saveFcmToken(userId, fcmToken.getFcmToken());

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fcm token 저장 성공"));
        } catch (DataIntegrityViolationException e) {
            log.error(e.getMessage());

            return ResponseEntity.status(409).body(BaseResponseBody.of(HttpStatus.CONFLICT.value(), "fcm token 중복"));
        }catch (IllegalArgumentException | OptimisticLockingFailureException e) {
            log.error(e.getMessage());

            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "fcm token 저장 실패"));
        }
    }

    @GetMapping("/{userId}/fcm-token")
    @Operation(summary = "fcm token 조회", description = "userId의 fcm token을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<List<String>> getFcmToken( @PathVariable("userId") String userId) {

        try {
            List<String> results = userService.getUserFcmToken(userId);

            return ResponseEntity.status(200).body(results);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/notifications/fcm-token")
    @Operation(summary = "D-day 알림에 필요한 fcm token 조회", description = "인자로 받은 회원들의 fcm token을 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "10001", description = "예상치 못한 오류"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<DeduplicatedUsersIdDto> findAllUsersFcmToken(@RequestBody DeduplicatedUsersIdDto deduplicatedUsersIdDto) {
        log.info("********* users/fcm-token 요청~~~!!!");
        try {
//            DeduplicatedUsersIdDto result = new DeduplicatedUsersIdDto();

            deduplicatedUsersIdDto = userService.findAllUsersFcmToken(deduplicatedUsersIdDto);

            return ResponseEntity.status(200).body(deduplicatedUsersIdDto);

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "사용자 로그아웃")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> logout(
            @Parameter(hidden = true) @RequestHeader("Authorization") String authorization
    ) {
        try {
            String accessToken = authorization.substring("Bearer ".length());
            userService.logout(accessToken);

            return ResponseEntity.status(200).body(null);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }

}


