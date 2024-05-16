package com.luckyseven.user.user.service;

import com.luckyseven.user.message.dto.BaseMessageDto;
import com.luckyseven.user.user.dto.DeduplicatedUsersIdDto;
import com.luckyseven.user.user.dto.MyInfoDto;
import com.luckyseven.user.user.dto.UserDto;
import com.luckyseven.user.user.entity.FcmToken;
import com.luckyseven.user.user.entity.User;
import com.luckyseven.user.user.repository.FcmTokenRepository;
import com.luckyseven.user.user.repository.UserQueryRepository;
import com.luckyseven.user.user.repository.UserRepository;
import com.luckyseven.user.util.feign.NotificationFeignClient;
import com.luckyseven.user.util.jwt.JWTUtil;
import com.luckyseven.user.message.ProducerService;
import com.luckyseven.user.message.dto.Topic;
import com.luckyseven.user.util.redis.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JWTUtil jWTUtil;

    private final RedisService redisService;

    private final UserRepository userRepository;
    private final FcmTokenRepository fcmTokenRepository;
    private final UserQueryRepository userQueryRepository;

    private final NotificationFeignClient notificationFeignClient;

    private final ProducerService producerService;

    @Value("${kakao.api.admin.key}")
    private String adminKey;

    @Value("${kakao.api.user.unlink}")
    private String unlinkUrl;

    @Override
    public boolean isExistUser(String userId) {
        return userRepository.findByUserId(userId) != null;
    }

    @Override
    public MyInfoDto getMyInfo(String userId) {
        User user = userRepository.findByUserId(userId);

        return (user == null) ? null : MyInfoDto.of(user);
    }

    @Override
    public UserDto getUser(String userId) {
        User user = userRepository.findByUserId(userId);

        return UserDto.of(user);
    }

    @Override
    public void deleteUser(String userId, String accessToken) {
        // 알림 삭제, 회원 삭제 + FCM TOKEN 삭제
        User user = userRepository.findByUserId(userId);

        // 알림 삭제
        BaseMessageDto dataSet = new BaseMessageDto();
        dataSet.setTopic(Topic.DELETE_USER);
        dataSet.setData(userId);
        producerService.sendNotificationMessage(dataSet);

        userRepository.delete(user);

        // jwt token 삭제
        redisService.saveLogoutToken(accessToken);
        redisService.delete(userId);

        // 카카오 연결 끊기
        unlink(userId);
    }

    @Override
    public void saveFcmToken(String userId, String token) {
        User user = userRepository.findByUserId(userId);
        FcmToken fcmToken = new FcmToken();
        fcmToken.setFcmToken(token);
        fcmToken.setUser(user);
        fcmTokenRepository.saveAndFlush(fcmToken);
    }

    @Override
    public List<String> getUserFcmToken(String userId) {

        return userQueryRepository.getFcmTokenWithUserId(userId);
    }

    @Override
    public void logout(String accessToken) {
        String id = jWTUtil.getId(accessToken);
        // refreshToken 삭제
        redisService.delete(id);

        // accessToken blackList 처리
        redisService.saveLogoutToken(accessToken);
    }

    @Override
    public DeduplicatedUsersIdDto findAllUsersFcmToken(DeduplicatedUsersIdDto deduplicatedUsersIdDto) {
        deduplicatedUsersIdDto = userQueryRepository.findAllUsersFcmToken(deduplicatedUsersIdDto);
        return deduplicatedUsersIdDto;
    }

    private String unlink(String userId) {
        RestClient restClient = RestClient.create();

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("target_id_type", "user_id");
        requestBody.add("target_id", userId);

        RestClient.ResponseSpec response = restClient
                .post()
                .uri(unlinkUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .header("Authorization", "KakaoAK " + adminKey)
                .body(requestBody)
                .retrieve();


        ResponseEntity<?> responseEntity = response.toEntity(Object.class);
        Map<String, Object> map = (Map<String, Object>) responseEntity.getBody();

        String id = String.valueOf(map.get("id"));
        log.info("unlink id: {}", id);

        return id;
    }
}
