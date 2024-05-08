package com.luckyseven.notification.config;


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
//    @Value("${rabbitmq.user.exchange}")
//    private String USER_EXCHANGE;
//    @Value("${rabbitmq.notification.exchange}")
//    private String NOTIFICATION_EXCHANGE;
//
//    @Value("${rabbitmq.user.queue}")
//    private String USER_QUEUE;
//    @Value("${rabbitmq.notification.queue}")
//    private String NOTIFICATION_QUEUE;
//
//
//    @Bean
//    public Queue userQueue() {
//        return new Queue(USER_QUEUE, false);
//    }
//    @Bean
//    public Queue notificationQueue() {
//        return new Queue(NOTIFICATION_QUEUE, false);
//    }
//
//    @Bean
//    public TopicExchange userExchange() {
//        return new TopicExchange(USER_EXCHANGE);
//    }
//    @Bean
//    public TopicExchange notificationExchange() {
//        return new TopicExchange(NOTIFICATION_EXCHANGE);
//    }
//
//    /**
//     * 바로 QUEUE에 넣는 것이 아니라 EXCHANGE에서 라우팅 규칙에 따라 QUEUE에 넣습니다
//     * 그래서 아래의 코드에서 EXCHANGE와 QUEUE를 묶는 작업을 합니다
//     * 원래는 routingKey를 설정하는데 저희 상황에서 필요한지 모르겠어서 뺐습니다 -지연
//     */
//    @Bean
//    public Binding bindingUser(@Qualifier("userQueue") Queue userQueue, @Qualifier("userExchange")  TopicExchange userExchange) {
//        return BindingBuilder.bind(userQueue).to(userExchange).with("");
//    }
//    @Bean
//    public Binding bindingNotification(@Qualifier("notificationQueue") Queue notificationQueue, @Qualifier("notificationExchange") TopicExchange notificationExchange) {
//        return BindingBuilder.bind(notificationQueue).to(notificationExchange).with("");
//    }
//

    /**
     * Byte 배열 메세지를 JSON으로 간주하여 변환하는 역할
     */
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}
