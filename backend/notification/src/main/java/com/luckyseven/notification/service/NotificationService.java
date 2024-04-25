package com.luckyseven.notification.service;

import com.luckyseven.notification.documents.Notification;
import com.luckyseven.notification.documents.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface NotificationService {
    @Autowired
    List<Notification> findAllByUserId(String userId);

    String findByNotificationId(String notificationId);

    void deleteByNotificationId(String notificationId);

    // 알림 발생시키는 로직.
    void sendNotification(String userId, NotificationType type);
}
