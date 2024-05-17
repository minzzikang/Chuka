package com.luckyseven.notification.util.fcm;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import com.luckyseven.notification.dto.FCMMessageDto;
import com.luckyseven.notification.util.feign.UserFeignClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class FcmSender {
    private final UserFeignClient userFeignClient;
    private final String API_URL =
            "https://fcm.googleapis.com/v1/projects/chuka-62524/messages:send";
    private final ObjectMapper objectMapper;

    public void sendMessageTo(FCMMessageDto fcmMessageDto) throws IOException {
//        log.info("*********************sendMessageTo***************************");
        String message = makeMessage(fcmMessageDto);

        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody =
                RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
        Request request =
                new Request.Builder()
                        .url(API_URL)
                        .post(requestBody)
                        .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                        .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                        .build();

        try(Response response = client.newCall(request).execute()){
            if(!response.isSuccessful()){
                userFeignClient.deleteInvalidFcmtoken(fcmMessageDto.getTargetToken());
            }
//            else {
//                log.info("전송!");
//            }

        }catch (Exception e){
            log.error("Error sending FCM message: {}", e.getMessage());
        }


    }

    private String makeMessage(FCMMessageDto fcmMessageDto)
            throws JsonParseException, JsonProcessingException {
        String body = fcmMessageDto.getBody();
        if(body == null ){
            body = "눌러서 확인하기🎉";
        }else {
            body = ("🎉"+fcmMessageDto.getBody()+"🎉");
        }
//        System.out.println("fcmMessageDto >> "+fcmMessageDto);
        FcmMSG fcmMessage =
                FcmMSG.builder()
                        .message(
                                FcmMSG.Message.builder()
                                        .token(fcmMessageDto.getTargetToken())
                                        .data(fcmMessageDto.getData())
                                        .notification(
                                                FcmMSG.Notification.builder()
                                                        .title(fcmMessageDto.getContent())
                                                        .body(body)
//                                                        .body("눌러서 확인하기🎉")
                                                        .build())
                                        .build())
                        .validateOnly(false)
                        .build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase/chuka-fcm.json";

        GoogleCredentials googleCredentials =
                GoogleCredentials.fromStream(
                                new ClassPathResource(firebaseConfigPath).getInputStream())
                        .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }
}
