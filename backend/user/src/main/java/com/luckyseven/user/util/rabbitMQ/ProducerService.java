package com.luckyseven.user.util.rabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.user.util.rabbitMQ.req.NotificationReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProducerService {

    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    @Value("${rabbitmq.notification.exchange}")
    private String NOTIFICATION_EXCHANGE;

    public void sendNotificationMessage(NotificationReq req) {
        rabbitTemplate.convertAndSend(NOTIFICATION_EXCHANGE, "", req);
    }

}
