package com.luckyseven.notification.message;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.notification.dto.BaseMessageDto;
import com.luckyseven.notification.dto.DdayReceiveDto;
import com.luckyseven.notification.dto.DeduplicatedUsersIdDto;
import com.luckyseven.notification.service.NotificationService;
import com.luckyseven.notification.message.dto.Topic;
import com.luckyseven.notification.util.feign.UserFeignClient;
import feign.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {

    //    private final String NOTIFICATION_QUEUE = "notification.queue";
    private final String USER_TO_NOTIFICATION_QUEUE = "user_to_notification.queue";
    private final String EVENT_TO_NOTIFICATION_QUEUE = "event_to_notification.queue";

    private final NotificationService notificationService;
    private final UserFeignClient userFeignClient;

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
                DeduplicatedUsersIdDto DUDdto = new DeduplicatedUsersIdDto();
                ObjectMapper om = new ObjectMapper();

                for (Object datum : (List) dataSet.getData()) {
                    String json = om.writeValueAsString(datum);
                    DdayReceiveDto data = om.readValue(json, new TypeReference<DdayReceiveDto>() {
                    });
                    // 여기서 회원 정보를 보내서 fcm을 받아오는 로직을 처리해야하는데...
                    HashMap<String, List<String>> deduplicatedUserIdList = DUDdto.getHashMapData();

                    deduplicatedUserIdList.put(data.getCreater(), null);
                    for (String joinMember : data.getJoinMembers()) {
                        deduplicatedUserIdList.put(joinMember, null);
                    }
                }
                // 보냄~~~~~
                Response response = userFeignClient.findAllUsersFcmToken(DUDdto);

                log.info(" \n ** response => {} \n ",response);
                log.info(" \n ** response body => {} \n ",response.body());

                InputStream inputStream = response.body().asInputStream();

                try {
                    // InputStream을 문자열로 변환한다.
                    String responseBody = IOUtils.toString(inputStream, "UTF-8");

//                    ObjectMapper om = new ObjectMapper();
                    String json = om.writeValueAsString(responseBody);
                    DeduplicatedUsersIdDto data = om.readValue(json, new TypeReference<DeduplicatedUsersIdDto>() {
                    });



                } finally {
                    // 사용이 끝난 InputStream은 닫아주어야 한다.
                    inputStream.close();
                }



            }


        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
    }

    // userToNoti

}
