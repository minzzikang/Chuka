package com.luckyseven.notification.util.rabbitMQ.req;


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
