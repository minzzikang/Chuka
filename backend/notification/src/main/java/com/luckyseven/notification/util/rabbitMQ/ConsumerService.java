package com.luckyseven.notification.util.rabbitMQ;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {

    private final String PRODUCT_QUEUE = "notification.queue";

//    public void receiveCrawlingMessage(String ) {
//
//    }

}
