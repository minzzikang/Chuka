package com.luckyseven.notification.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.notification.dto.BaseMessageDto;
import com.luckyseven.notification.dto.DdayReceiveDto;
import com.luckyseven.notification.util.rabbitMQ.req.NotificationReq;
import com.luckyseven.notification.util.rabbitMQ.req.Topic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {

    private final String NOTIFICATION_QUEUE = "notification.queue";
    private final String EVENT_TO_NOTIFICATION_QUEUE = "event_to_notification.queue";

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

    @Transactional
    @RabbitListener(queues = EVENT_TO_NOTIFICATION_QUEUE)
    public void receiveEventMessage(BaseMessageDto dataSet) {
        log.info("receiveEventMessage: {}", dataSet.toString());

        try {
            for (Object datum : (List)dataSet.getData()) {
                System.out.println("datum =>>> "+datum);
                System.out.println("datum Class =>>> "+datum.getClass());
                ObjectMapper om = new ObjectMapper();
                String json = om.writeValueAsString(datum);
                System.out.println("json = " + json);
                Map<String, Object> map = om.readValue(json, new TypeReference<Map<String, Object>>() {});

                List<String> joinMembers = (List<String>) map.get("joinMembers");
                String creater = (String) map.get("creater");
                Integer eventId = (Integer) map.get("eventId");
                DdayReceiveDto ddayReceiveDto = new DdayReceiveDto(joinMembers, creater, eventId);
                System.out.println("ddayReceiveDto = " + ddayReceiveDto);
            }
            if (dataSet.getTopic().equals(Topic.DDAY_ALARM)) {
                log.info("DdayAlarm, data =>> {}", dataSet.getData());
            }



        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
    }

}
