package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.user.dto.UserDto;
import com.luckyseven.user.user.entity.Roles;
import com.luckyseven.user.user.entity.User;
import com.luckyseven.user.user.repository.UserRepository;
import com.luckyseven.user.util.jwt.JWTUtil;
import com.luckyseven.user.util.redis.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JWTUtil jWTUtil;
    private final RedisService redisService;
    private final UserRepository userRepository;

    @Value("${kakao.api.rest.key}")
    private String apiKey;

    @Value("${kakao.api.oauth.token}")
    private String getTokenUri;

    @Value("${kakao.api.user.me}")
    private String getUserInfoUri;

    @Value("${kakao.api.redirect}")
    private String redirectUri;

    @Override
    public String getKakaoToken(String code) {
        RestClient restClient = RestClient.create();
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();

        requestBody.add("grant_type", "authorization_code");
        requestBody.add("client_id", apiKey);
        requestBody.add("redirect_uri", redirectUri);
        requestBody.add("code", code);

        log.info("code: {}", code);
        log.info("redirectUri: {}", redirectUri);

        RestClient.ResponseSpec response = restClient
                .post()
                .uri(getTokenUri)
                .contentType(APPLICATION_FORM_URLENCODED)
                .body(requestBody)
                .retrieve();

        ResponseEntity<?> responseEntity = response.toEntity(Object.class);
        Map<String, Object> map = (Map<String, Object>) responseEntity.getBody();
        String accessToken = (String) Objects.requireNonNull(map).get("access_token");

        log.info("kakaoAccessToken: {}", accessToken);

        return accessToken;
    }

    @Override
    public KakaoUserDto getKakaoUserInfo(String token) {
        RestClient restClient = RestClient.create();

        log.info("token: {}", token);
        log.info("getUserInfoUri: {}", getUserInfoUri);

        RestClient.ResponseSpec response = restClient
                .get()
                .uri(getUserInfoUri)
                .header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
                .header("Authorization", "Bearer " + token)
                .retrieve();

        log.info("response: {}", response);

        ResponseEntity<?> responseEntity = response.toEntity(Object.class);

        log.info("body: {}", responseEntity.getBody());
        log.info("statusCode: {}", responseEntity.getStatusCode());

        Map<String, Object> map = (Map<String, Object>) responseEntity.getBody();
        KakaoUserDto kakaoUser = new KakaoUserDto();
        kakaoUser.setId((Long) map.get("id"));
        kakaoUser.setConnectedAt(LocalDateTime.parse(map.get("connected_at").toString(), DateTimeFormatter.ISO_DATE_TIME));
        log.info("response - properties: {}", map.get("properties"));
        log.info("response - kakao_account: {}", map.get("kakao_account"));

        KakaoUserDto.Properties properties = new KakaoUserDto.Properties();
        HashMap<String, Object> propertiesTmp = (HashMap<String, Object>) map.get("properties");
        properties.setNickname((String) propertiesTmp.get("nickname"));
        properties.setProfileImage((String) propertiesTmp.get("profile_image"));
        properties.setThumbnailImage((String) propertiesTmp.get("thumbnail_image"));

        log.info("save - properties: {}", properties);

        kakaoUser.setProperties(properties);

        log.info("save - kakaoUser: {}", kakaoUser);

        return kakaoUser;
    }

    public UserDto join(KakaoUserDto userDto) {
        User user = new User();
        user.setUserId(String.valueOf(userDto.getId()));
        user.setNickname(userDto.getProperties().getNickname());
        user.setProfileImage(userDto.getProperties().getProfileImage());
        user.setRole(Roles.ROLE_USER);
        user.setJoinDate(LocalDateTime.now());
//        user.setJoinDate(userDto.getConnectedAt());

        return UserDto.of(userRepository.save(user));
    }

    public String issueAccessToken(KakaoUserDto userDto) {
        // 1시간 후 토큰 만료
        return jWTUtil.createAccessToken(
                String.valueOf(userDto.getId()),
                userDto.getProperties().getNickname(),
                Roles.ROLE_USER
        );
    }

    public String issueAccessToken(UserDto userDto) {
        // 1시간 후 토큰 만료
        return jWTUtil.createAccessToken(
                userDto.getUserId(),
                userDto.getNickname(),
                userDto.getRole()
        );
    }

    private String issueAccessToken(String userId, String nickname, Roles role) {
        return jWTUtil.createAccessToken(
                userId,
                nickname,
                role
        );
    }

    @Override
    public String issueRefreshToken(UserDto userDto) {
        // 15일 후 토큰 만료
        String refreshToken = jWTUtil.createRefreshToken(
                userDto.getUserId(),
                userDto.getNickname(),
                userDto.getRole()
        );

        redisService.saveRefreshToken(userDto.getUserId(), refreshToken);

        return refreshToken;
    }

    @Override
    public String issueRefreshToken(KakaoUserDto userDto) {

        return issueRefreshToken(UserDto.of(userDto));
    }

    @Override
    public String reIssueAccessTokenWithRefreshToken(String refreshToken) {
        String id = jWTUtil.getId(refreshToken);

        if (jWTUtil.getType(refreshToken).equals("RTK")
                && redisService.getValues(id).equals(refreshToken)) {
                User user = userRepository.findByUserId(id);

                // refreshToken 재발급
                // issueRefreshToken(UserDto.of(user));
                return issueAccessToken(UserDto.of(user));
        }

        return null;
    }

    @Override
    public void logout(String accessToken) {
        String id = jWTUtil.getId(accessToken);
        // refreshToken 삭제
        redisService.delete(id);

        // accessToken blackList 처리
        redisService.saveLogoutToken(accessToken);
    }

}
