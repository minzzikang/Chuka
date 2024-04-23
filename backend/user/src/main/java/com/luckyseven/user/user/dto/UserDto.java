package com.luckyseven.user.user.dto;

import com.luckyseven.user.user.entity.Roles;
import com.luckyseven.user.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

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

}
