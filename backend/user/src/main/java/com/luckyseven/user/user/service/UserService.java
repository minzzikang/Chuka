package com.luckyseven.user.user.service;

import com.luckyseven.user.user.dto.MyInfoDto;
import com.luckyseven.user.user.dto.UserDto;

import java.util.List;

public interface UserService {

    boolean isExistUser(String userId);

    MyInfoDto getMyInfo(String userId);
    UserDto getUser(String userId);
    void deleteUser(String userId, String accessToken);

    void saveFcmToken(String userId, String token);
    List<String> getUserFcmToken(String userId);

    void logout(String accessToken);

}
