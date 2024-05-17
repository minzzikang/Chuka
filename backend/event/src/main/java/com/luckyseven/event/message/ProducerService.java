package com.luckyseven.event.message;

import com.luckyseven.event.message.dto.BaseMessageDto;
import com.luckyseven.event.message.dto.Topic;
import com.luckyseven.event.rollsheet.dto.EventCreateAlarmDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * 현재 서버가 요청을 보내는 코드는 여기에 작성해주세요
 * 현재 파일로 알아보는 Message QUEUE 흐름도
 * provider(현재 파일) -> Exchange(crawling.topic) -> QUEUE (crawling.queue) -> consumer(크롤링 서버에 작성 됨)
 * 따라서 보내는 입장에서는 *보내고 싶은 Exchange 이름*을 알면 됩니다
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ProducerService {
    private final RabbitTemplate rabbitTemplate;
//    private final ObjectMapper objectMapper;

    @Value("${rabbitmq.event_to_notification.exchange}")
    private String EVENT_TO_NOTIFICATION_EXCHANGE;

    public void sendNotificationMessage(BaseMessageDto dataSet) {
        rabbitTemplate.convertAndSend(EVENT_TO_NOTIFICATION_EXCHANGE, "", dataSet);
    }

//    public void sendNotificationMessage(int eventId, String pageUri, String userId) {
//        // 알림 발생.
//        EventCreateAlarmDto eventCreateAlarmDto = new EventCreateAlarmDto();
//        eventCreateAlarmDto.setEventId(eventId);
//        eventCreateAlarmDto.setUserId(userId);
//        eventCreateAlarmDto.setEventPageUri(pageUri);
//
//        BaseMessageDto baseMessageDto = new BaseMessageDto(Topic.EVENT_CREATE,eventCreateAlarmDto);
////        baseMessageDto.setData(eventCreateAlarmDto);
////        baseMessageDto.setTopic(Topic.EVENT_CREATE);
//
//        rabbitTemplate.convertAndSend(EVENT_TO_NOTIFICATION_EXCHANGE, "", baseMessageDto);
//    }
}