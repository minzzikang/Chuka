package com.luckyseven.user.config;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Value("${rabbitmq.user_to_notification.exchange}")
    private String USER_TO_NOTIFICATION_EXCHANGE;
    @Value("${rabbitmq.user_to_notification.queue}")
    private String USER_TO_NOTIFICATION_QUEUE;

    @Bean
    public Queue userToNotificationQueue() {
        return new Queue(USER_TO_NOTIFICATION_QUEUE, false);
    }

    @Bean
    public TopicExchange userToNotificationExchange() {
        return new TopicExchange(USER_TO_NOTIFICATION_EXCHANGE);
    }

    @Bean
    public Binding bindingNotification(@Qualifier("userToNotificationQueue") Queue userToNotificationQueue,@Qualifier("userToNotificationExchange")  TopicExchange userToNotificationExchange) {
        return BindingBuilder.bind(userToNotificationQueue).to(userToNotificationExchange).with("");
    }

    /**
     * Byte 배열 메세지를 JSON으로 간주하여 변환하는 역할
     */
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}
