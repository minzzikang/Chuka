package com.luckyseven.user.user.dto;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.user.entity.Roles;
import com.luckyseven.user.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UserDto {

    private String userId;

    private String nickname;

    private String profileImage;

    private LocalDateTime joinDate;

    private Roles role;

    public static UserDto of(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setNickname(user.getNickname());
        userDto.setJoinDate(user.getJoinDate());
        userDto.setProfileImage(user.getProfileImage());
        userDto.setRole(user.getRole());

        return userDto;
    }

    public static UserDto of(KakaoUserDto user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(String.valueOf(user.getId()));
        userDto.setNickname(user.getProperties().getNickname());
        userDto.setProfileImage(user.getProperties().getProfileImage());
        userDto.setJoinDate(user.getConnectedAt());
        // role
        return userDto;
    }

}
