package com.luckyseven.funding.config;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;

import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitConfig {
    @Value("${rabbitmq.crawling.exchange}")
    private String CRAWLING_EXCHANGE;
    @Value("${rabbitmq.product.exchange}")
    private String PRODUCT_EXCHANGE;
    @Value("${rabbitmq.crawling.queue}")
    private String CRAWLING_QUEUE;
    @Value("${rabbitmq.product.queue}")
    private String PRODUCT_QUEUE;

    @Bean
    public Queue crawlingQueue() {
        return new Queue(CRAWLING_QUEUE, false);
    }
    @Bean
    Queue fundingQueue() {
        return new Queue(PRODUCT_QUEUE, false);
    }

    @Bean
    public TopicExchange crawlingExchange() {
        return new TopicExchange(CRAWLING_EXCHANGE);
    }
    @Bean
    TopicExchange fundingExchange() {
        return new TopicExchange(PRODUCT_EXCHANGE);
    }

    /**
     * 바로 QUEUE에 넣는 것이 아니라 EXCHANGE에서 라우팅 규칙에 따라 QUEUE에 넣습니다
     * 그래서 아래의 코드에서 EXCHANGE와 QUEUE를 묶는 작업을 합니다
     * 원래는 routingKey를 설정하는데 저희 상황에서 필요한지 모르겠어서 뺐습니다 -지연
     */
    @Bean
    public Binding bindingCrawling(@Qualifier("crawlingQueue") Queue crawlingQueue,@Qualifier("crawlingExchange")  TopicExchange crawlingExchange) {
        return BindingBuilder.bind(crawlingQueue).to(crawlingExchange).with("");
    }
    @Bean
    Binding bindingFunding(@Qualifier("fundingQueue") Queue fundingQueue,@Qualifier("fundingExchange") TopicExchange fundingExchange) {
        return BindingBuilder.bind(fundingQueue).to(fundingExchange).with("");
    }

    /**
     * Byte 배열 메세지를 JSON으로 간주하여 변환하는 역할
     */
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}
