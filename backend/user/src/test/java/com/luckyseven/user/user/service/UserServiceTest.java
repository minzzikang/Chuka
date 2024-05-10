package com.luckyseven.user.user.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.auth.service.AuthService;
import com.luckyseven.user.user.dto.MyInfoDto;
import com.luckyseven.user.user.dto.UserDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class UserServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @Test
    @DisplayName("존재하는 유저 아이디인지 검증")
    void isExistUser() {
        assertThat(userService.isExistUser("1")).isTrue();
        assertThat(userService.isExistUser("2")).isFalse();
    }

    @Test
    @DisplayName("내 정보 불러오기")
    void getMyInfo() {
        //
        MyInfoDto myInfo = userService.getMyInfo("1");

        //  결과 1
        System.out.println("myInfo: " + myInfo);
        assertThat(myInfo).isNotNull();

        // 결과 2
        assertThatThrownBy(() -> userService.getMyInfo("2"))
                .isInstanceOf(NullPointerException.class);
    }

    @Test
    @DisplayName("유저 정보 조회")
    void getUser() {
        UserDto user = userService.getUser("1");

        // 결과 1
        assertThat(user).isNotNull();

        // 결과 2
        assertThatThrownBy(() -> userService.getUser("2"))
                .isInstanceOf(NullPointerException.class);

    }

    @Test
    @DisplayName("회원 탈퇴")
    void deleteUser() {
    }

    @Test
    void saveFcmToken() {
        //
        assertDoesNotThrow(() -> userService.saveFcmToken("1", "1"));

        // 중복
        assertThatThrownBy(() -> userService.saveFcmToken("1", "1"))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void getUserFcmToken() {
    }

    @Test
    @DisplayName("로그아웃")
    void logout() {
        // accessToken 발급
        KakaoUserDto userDto = new KakaoUserDto();
        userDto.setId(1L);
        KakaoUserDto.Properties properties = new KakaoUserDto.Properties();
        properties.setNickname("테스트_닉네임");
        userDto.setProperties(properties);
        String accessToken = authService.issueAccessToken(userDto);

        //
        userService.logout(accessToken);
    }

    @Test
    void findAllUsersFcmToken() {

    }
}