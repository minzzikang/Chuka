package com.luckyseven.user.user.service;

import com.luckyseven.user.user.dto.MyInfoDto;
import com.luckyseven.user.user.dto.UserDto;
import com.luckyseven.user.user.entity.User;
import com.luckyseven.user.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean isExistUser(String userId) {
        return userRepository.findByUserId(userId) != null;
    }

    @Override
    public MyInfoDto getMyInfo(String userId) {
        User user = userRepository.findByUserId(userId);

        return MyInfoDto.of(user);
    }

    @Override
    public UserDto getUser(String userId) {
        User user = userRepository.findByUserId(userId);

        return UserDto.of(user);
    }

    @Override
    public void deleteUser(String userId) {
        // TODO: 알림 삭제, 펀딩 삭제, 롤링페이퍼 삭제, 회원 삭제
    }
}
