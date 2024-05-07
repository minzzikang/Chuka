package com.luckyseven.notification.util.rabbitMQ;

import com.luckyseven.notification.service.NotificationService;
import com.luckyseven.notification.util.rabbitMQ.req.NotificationReq;
import com.luckyseven.notification.util.rabbitMQ.req.Topic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {

    private final String NOTIFICATION_QUEUE = "notification.queue";

    private final NotificationService notificationService;

    @Transactional
    @RabbitListener(queues = NOTIFICATION_QUEUE)
    public void receiveUserMessage(NotificationReq req) {
        log.info("receiveUserMessage: {}", req);
        try {
            switch (req.getTopic()) {
                case DELETE_USER -> {
                    log.info("DELETE_USER");
                    notificationService.deleteAllByUserId(req.getUserId());
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
    }

}
