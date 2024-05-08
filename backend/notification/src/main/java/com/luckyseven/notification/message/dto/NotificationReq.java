package com.luckyseven.notification.message.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Notification MQ Request")
public class NotificationReq {

    String userId;
    Topic topic;

}
