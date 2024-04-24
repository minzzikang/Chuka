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

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
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
    public String getToken(String code) {
        log.info("getToken start!!--");

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

        log.info("statusCode: {}", responseEntity.getStatusCode());

        Map<String, Object> map = (Map<String, Object>) responseEntity.getBody();
        String accessToken = (String) Objects.requireNonNull(map).get("access_token");
        log.info("accessToken: {}", accessToken);

        return accessToken;
    }

    @Override
    public KakaoUserDto getUserInfo(String token) {
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
        user.setJoinDate(userDto.getConnectedAt());

        return UserDto.of(userRepository.save(user));
    }

    public String login(KakaoUserDto userDto) {
        // 엑세스 토큰
        String accessToken =
                jWTUtil.createAccessToken(
                        userDto.getProperties().getNickname(),
                        String.valueOf(userDto.getId()),
                        Date.from(Instant.now().plus(1, ChronoUnit.DAYS))); // 1개월 후 토큰 만료

        issueRefreshToken(userDto);

        return accessToken;
    }

//    @Override
//    public String joinOrLoginForKakao(KakaoUserDto userDto) {
//        User user = userRepository.findByUserId(String.valueOf(userDto.getId()));
//
//        log.info("user: {}", user);
//        if (user == null) {
//            UserDto join = join(userDto);
//            log.info("join: {}", join);
//        }
//
//        String token = login(userDto);
//        log.info("login token: {}", token);
//
//        return token;
//    }

    @Override
    public String issueRefreshToken(UserDto userDto) {
        String refreshToken =
                jWTUtil.createRefreshToken(
                        userDto.getNickname(),
                        userDto.getUserId(),
                        Date.from(Instant.now().plus(90, ChronoUnit.DAYS))); // 3개월 후 토큰 만료

        redisService.save(userDto.getUserId(), refreshToken);

        return refreshToken;
    }

    @Override
    public String issueRefreshToken(KakaoUserDto userDto) {

        return issueRefreshToken(UserDto.of(userDto));
    }




}
