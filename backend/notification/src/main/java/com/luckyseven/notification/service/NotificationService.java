package com.luckyseven.notification.service;

import com.luckyseven.notification.documents.Notification;
import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.dto.EventCreateAlarmDto;
import com.luckyseven.notification.dto.FundingToNotificationMessageDto;
import com.luckyseven.notification.dto.RollingpaperCreatAlarmDto;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface NotificationService {
    @Autowired
    List<Notification> findAllByUserId(String userId);

    String findByNotificationId(String notificationId);

    void deleteByNotificationId(String notificationId);

    // 일반 알림 발생시키는 로직.
    void sendNotification(String userId, NotificationType type);

    void sendGroupNotification(List<String> userIdList, NotificationType type, Integer curEventId, String curPageUri, String curEventTitle);

    void deleteAllByUserId(String userId);

    void sendNotification(EventCreateAlarmDto data);

    void sendFundingNotification(FundingToNotificationMessageDto fundingToNotificationMessageDto);

    void sendRollingCreate(RollingpaperCreatAlarmDto data);
}
