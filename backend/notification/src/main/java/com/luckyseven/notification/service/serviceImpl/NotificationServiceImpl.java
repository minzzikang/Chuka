package com.luckyseven.notification.service.serviceImpl;

import com.luckyseven.notification.documents.Notification;
import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.repository.NotificationRepository;
import com.luckyseven.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository repository;

    @Override
    public List<Notification> findAllByUserId(String userId) {
        return repository.findAllByUserId(userId);
    }

    @Override
    public String findByNotificationId(String notificationId) {
        return repository.findByNotificationId(notificationId);
    }

    @Override
    public void deleteByNotificationId(String notificationId) {
        repository.deleteByNotificationId(notificationId);
    }

    @Override
    public void sendNotification(String userId, NotificationType type) {

        Notification notification = new Notification(userId, type);
        repository.save(notification);

    }
}
