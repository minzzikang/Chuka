package com.luckyseven.notification.controller;

import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.documents.Test;
import com.luckyseven.notification.repository.NotificationRepository;
import com.luckyseven.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/notifacation/test")
public class TestController {
    private final NotificationService service;
    @GetMapping("/save")
    public ResponseEntity<?> test(){
        service.sendNotification("Likpark", NotificationType.EVENT_CREATE);
        service.sendNotification("Likpark", NotificationType.EVENT_OPEN);
        service.sendNotification("Likpark", NotificationType.FUNDING_APPROVED);
        service.sendNotification("Likpark", NotificationType.FUNDING_COMPLET);
        service.sendNotification("Likpark", NotificationType.FUNDING_DISAPPROVED);

        return ResponseEntity.ok().body("");
    }

    @GetMapping("/1")
    public ResponseEntity<?> test1(){

        return ResponseEntity.ok().body("connected");
    }
}
