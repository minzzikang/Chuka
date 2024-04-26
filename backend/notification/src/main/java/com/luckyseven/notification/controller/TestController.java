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
@RequestMapping("/api/v1/notifacations/test")
public class TestController {
    private final NotificationService service;
    @GetMapping("/save")
    public ResponseEntity<?> test(){
        service.sendNotification("3452659543", NotificationType.EVENT_CREATE);
        service.sendNotification("3452659543", NotificationType.EVENT_OPEN);
        service.sendNotification("3452659543", NotificationType.FUNDING_APPROVED);
        service.sendNotification("3452659543", NotificationType.FUNDING_COMPLET);
        service.sendNotification("3452659543", NotificationType.FUNDING_DISAPPROVED);

        return ResponseEntity.ok().body("");
    }

    @GetMapping("/1")
    public ResponseEntity<?> test1(){

        return ResponseEntity.ok().body("connected");
    }
}
