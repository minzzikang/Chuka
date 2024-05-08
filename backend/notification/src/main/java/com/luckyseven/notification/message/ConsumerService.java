package com.luckyseven.notification.message;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.notification.dto.BaseMessageDto;
import com.luckyseven.notification.dto.DdayReceiveDto;
import com.luckyseven.notification.service.NotificationService;
import com.luckyseven.notification.message.dto.NotificationReq;
import com.luckyseven.notification.message.dto.Topic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {

//    private final String NOTIFICATION_QUEUE = "notification.queue";
    private final String USER_TO_NOTIFICATION_QUEUE = "user_to_notification.queue";
    private final String EVENT_TO_NOTIFICATION_QUEUE = "event_to_notification.queue";

    private final NotificationService notificationService;
    private final ProducerService producerService;

    @Transactional
    @RabbitListener(queues = USER_TO_NOTIFICATION_QUEUE)
    public void receiveUserMessage(BaseMessageDto req) {
        log.info("receiveUserMessage: {}", req);
        try {
            switch (req.getTopic()) {
                case DELETE_USER -> {
                    log.info("DELETE_USER: {}", req.getData().toString());
                    notificationService.deleteAllByUserId(req.getData().toString());
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
            System.out.println("dataSet.getTopic() : " + dataSet.getTopic() + "(" + dataSet.getTopic().getClass() + ") " + "Topic.DDAY_ALARM : " + Topic.DDAY_ALARM + "(" + Topic.DDAY_ALARM.getClass() + ")");
            if (dataSet.getTopic().equals(Topic.DDAY_ALARM)) {
                for (Object datum : (List) dataSet.getData()) {
                    ObjectMapper om = new ObjectMapper();
                    String json = om.writeValueAsString(datum);
                    DdayReceiveDto data = om.readValue(json, new TypeReference<DdayReceiveDto>() {
                    });
                    // 여기서 회원 정보를 보내서 fcm을 받아오는 로직을 처리해야하는데...
                    List<String> tartgetMembers = data.getJoinMembers();
                    tartgetMembers.add(data.getCreater());
                    log.info("targetMembers : {]", tartgetMembers);

                    BaseMessageDto baseMessageDto = new BaseMessageDto();
                    baseMessageDto.setData(tartgetMembers);
                    baseMessageDto.setTopic(Topic.GET_FCM_TOKEN);

                    producerService.sendNotificationToUserMessage(baseMessageDto);
                    // 여기까지 user로 보내는 큐에 메시지를 전달했고

                    // fcmtoken 받아서 알림보낼거임.


                }
                log.info("DdayAlarm, data =>> {}", dataSet.getData());
            }


        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
    }

    // userToNoti

}
