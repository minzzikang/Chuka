package com.luckyseven.notification.controller;

import com.luckyseven.notification.commons.response.BaseResponseBody;
import com.luckyseven.notification.documents.Notification;
import com.luckyseven.notification.service.NotificationService;
import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("")
    public ResponseEntity<?> findAllNotificationsByUserId(@RequestHeader("loggedInUser") String userId) {
        log.info("------------------->> userId : {}",userId);
        try {

            List<Notification> notificationList = notificationService.findAllByUserId(userId);

            return ResponseEntity.ok().body(notificationList);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("");
        }


    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<?> deleteByNotificationId(@RequestHeader("loggedInUser") String userId,
                                                    @PathVariable("notificationId") String notificationId){

        try{
            String result = notificationService.findByNotificationId(notificationId);
            log.info("name: {}",result);
            if(result==null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"이미 삭제된 메시지입니다."));
            }

            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            String resultUserId = (String) jsonObject.get("userId");

            log.info("resultUserId : {}",resultUserId);


            // userId와 알림을 받은 회원의 아이디가 동일하면 본인 알림이 맞아서 삭제가능
            if(userId.equals(resultUserId)){
                notificationService.deleteByNotificationId(notificationId);
                return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, (result+" <== 삭제됨")));
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(BaseResponseBody.of(401,"권한없음"));
            }

            // 아니면 권한이 없다는 것


        }catch (Exception e ){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

}
