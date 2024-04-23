package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Value("${kakao.api.rest.key}")
    private String apiKey;

    @Value("${kakao.api.oauth.token}")
    private String getTokenUri;

    @Value("${kakao.api.user.me}")
    private String getUserInfoUri;

    @Value("${kakao.api.redirect}")
    private String redirectUri;

    public String test(String test) {
        log.info("test test test ---");
        System.out.println("ㅋㅋ");
        return test;
    }

    @Override
    public String getToken(String code) {
        log.info("getToken start!!--");
        // https://kauth.kakao.com/oauth/token
        // body grant_type client_id redirect_uri code

        // oauth/token으로 요청
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


//        ResponseEntity<?> responseEntity = response.toEntity(String.class);
//        TokenDto responseBody = (TokenDto) responseEntity.getBody();
//        HttpStatusCode statusCode = responseEntity.getStatusCode();

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

        ResponseEntity<?> responseEntity = response.toEntity(Object.class);

        log.info("statusCode: {}", responseEntity.getStatusCode());

        log.info("statusCode: {}", responseEntity.getBody());
        Map<String, Object> map = (Map<String, Object>) responseEntity.getBody();
        KakaoUserDto kakaoUser = new KakaoUserDto();
        kakaoUser.setId((Long) map.get("id"));
        kakaoUser.setConnectedAt((String) map.get("connected_at"));

        log.info("properties: {}", map.get("properties"));
        log.info("properties: {}", map.get("properties").getClass());
        log.info("??: {}", map.get("kakao_account"));
        log.info("??: {}", map.get("kakao_account").getClass());

        KakaoUserDto.Properties properties = new KakaoUserDto.Properties();
        HashMap<String, Object> propertiesTmp = (HashMap<String, Object>) map.get("properties");
        properties.setNickname((String) propertiesTmp.get("nickname"));
        properties.setProfileImage((String) propertiesTmp.get("profile_image"));
        properties.setThumbnailImage((String) propertiesTmp.get("thumbnail_image"));

        log.info("properties: {}", properties);

        kakaoUser.setProperties(properties);

        log.info("kakaoUser: {}", kakaoUser);

        return kakaoUser;
    }
}
