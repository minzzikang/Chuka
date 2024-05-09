package com.luckyseven.user.user.dto;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.user.entity.Roles;
import com.luckyseven.user.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(userId, userDto.userId) && Objects.equals(nickname, userDto.nickname) && Objects.equals(profileImage, userDto.profileImage) && Objects.equals(joinDate, userDto.joinDate) && role == userDto.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, nickname, profileImage, joinDate, role);
    }
}
