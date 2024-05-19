package com.luckyseven.notification.service.serviceImpl;

import com.luckyseven.notification.documents.Notification;
import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.dto.EventCreateAlarmDto;
import com.luckyseven.notification.dto.FundingToNotificationMessageDto;
import com.luckyseven.notification.dto.RollingpaperCreatAlarmDto;
import com.luckyseven.notification.repository.NotificationRepository;
import com.luckyseven.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository repository;

    @Override
    public List<Notification> findAllByUserId(String userId) {
        return repository.findAllByUserIdOrderByCreateDateTimeDesc(userId);
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

    // 단체 알림.
    @Override
    public void sendGroupNotification(List<String> userIdList, NotificationType type, Integer curEventId, String curPageUri, String curEventTitle) {
        List<Notification> saveDataList = new ArrayList<>();
        for (String userId : userIdList) {
            Notification notification = new Notification(userId, type);
            notification.setEventId(curEventId);
            notification.setPageUri(curPageUri);
            notification.setEventTitle(curEventTitle);
            saveDataList.add(notification);
        }

        repository.saveAll(saveDataList);
    }

    @Override
    public void deleteAllByUserId(String userId) {
        repository.deleteAllByUserId(userId);
    }

    @Override
    public void sendNotification(EventCreateAlarmDto data) {
        Notification notification = new Notification(data.getUserId(), NotificationType.EVENT_CREATE);
        notification.setPageUri(data.getEventPageUri());
        notification.setEventId(data.getEventId());
        repository.save(notification);

    }

    @Override
    public void sendFundingNotification(FundingToNotificationMessageDto fundingToNotificationMessageDto) {
        Notification notification = new Notification(fundingToNotificationMessageDto.getUserId(), fundingToNotificationMessageDto.getType());
        notification.setFundingId(fundingToNotificationMessageDto.getFundingId());
        notification.setUserId(fundingToNotificationMessageDto.getUserId());
        repository.save(notification);
    }

    @Override
    public void sendRollingCreate(RollingpaperCreatAlarmDto data) {
        Notification notification = new Notification(data.getUserId(), NotificationType.ROLLING_CREATE);
        notification.setPageUri(data.getPageUri());
        notification.setEventId(data.getEventId());
        notification.setContentForRollingCreate((data.getEventTitle()+" "+notification.getContent()));
//        notification.setEventTitle(data.getEventTitle());
        notification.setUserId(data.getUserId());
        repository.save(notification);
    }
}
