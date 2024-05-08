package com.luckyseven.user.message;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.user.message.dto.BaseMessageDto;
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

    @Value("${rabbitmq.user_to_notification.exchange}")
    private String USER_TO_NOTIFICATION_EXCHANGE;

    public void sendNotificationMessage(BaseMessageDto dataSet) {
        rabbitTemplate.convertAndSend(USER_TO_NOTIFICATION_EXCHANGE, "", dataSet);
    }

}
