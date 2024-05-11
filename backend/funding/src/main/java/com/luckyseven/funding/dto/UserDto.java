package com.luckyseven.funding.dto;

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
}
