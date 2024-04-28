package com.luckyseven.user.user.service;

import com.luckyseven.user.user.dto.MyInfoDto;
import com.luckyseven.user.user.dto.UserDto;

public interface UserService {

    boolean isExistUser(String userId);

    MyInfoDto getMyInfo(String userId);
    UserDto getUser(String userId);
    void deleteUser(String userId);

    void saveFcmToken(String userId, String token);

}
