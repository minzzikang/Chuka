package com.luckyseven.user.user.controller;

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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> deleteMyId(@RequestHeader("loggedInUser") String userId) {
        // TODO : SINYEONG
        userService.deleteUser(userId);

        return ResponseEntity.status(200).body(null);
    }

    @GetMapping("/{userId}")
    @Operation(summary = "회원 정보 조회", description = "userId에 해당하는 회원 정보를 조회한다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 사용자"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<UserDto> getUserInfo(@PathVariable("userId") String userId) {
        UserDto userDto = userService.getUser(userId);

        if (userDto == null) {

            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(userDto);
    }

}


