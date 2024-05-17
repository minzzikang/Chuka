package com.luckyseven.notification.documents;

import com.luckyseven.notification.commons.notification.NotificationResponseDescription;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Data
@Document(collection = "notification")
public class Notification {

    @Id
    private String notificationId;
    private String userId;
    private String content;
    private String eventTitle;
    private String createDateTime;
    private String pageUri;
    private Integer eventId;
    private Integer fundingId;
    private NotificationType type;

    public Notification() {
    }

    public Notification(String userId, NotificationType type) {
        setNotificationId(); // id 설정.
        this.userId = userId; // 카카오ID
        this.type = type; // 알림 타입
        setContent(type);
        setCreationDateTime(); // 형식 => "생성일 2024.02.15 12:13"
    }

    /**
     *
     * @param type 메시지 타입에따라 알림 내용을 설정한다.
     */
    public void setContent(NotificationType type) {
        String newContent = "";
        if (type.equals(NotificationType.EVENT_CREATE)) {
            newContent = NotificationResponseDescription.EVENT_CREATE;

        } else if (type.equals(NotificationType.EVENT_OPEN)) {
            newContent = NotificationResponseDescription.EVENT_OPEN;

        } else if (type.equals(NotificationType.FUNDING_APPROVED)) {
            newContent = NotificationResponseDescription.FUNDING_APPROVED;

        } else if (type.equals(NotificationType.FUNDING_DISAPPROVED)) {
            newContent = NotificationResponseDescription.FUNDING_DISAPPROVED;

        } else if (type.equals(NotificationType.FUNDING_COMPLETE)) {
            newContent = NotificationResponseDescription.FUNDING_COMPLETE;
        } else if (type.equals(NotificationType.ROLLING_CREATE)) {
            newContent = NotificationResponseDescription.ROLLING_CREATE;
        }

        this.content = newContent;
    }

    public void setContentForRollingCreate(String  stringdata){
        this.content = stringdata;

    }

    /**
     * 식별자를 UUID로 세팅한다.
     */
    public void setNotificationId() {
        this.notificationId = UUID.randomUUID().toString().split("-")[0];
    }

    public void setCreationDateTime() {
        LocalDateTime nowDateTime = LocalDateTime.now();
        // 원하는 형식의 문자열로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
        String formattedDateTime = nowDateTime.format(formatter);

        // 문자열을 LocalDateTime으로 다시 변환
        this.createDateTime = LocalDateTime.parse(formattedDateTime, formatter).toString();
    }
}
