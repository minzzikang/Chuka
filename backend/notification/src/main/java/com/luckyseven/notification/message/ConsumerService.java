package com.luckyseven.notification.message;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.dto.BaseMessageDto;
import com.luckyseven.notification.dto.DdayReceiveDto;
import com.luckyseven.notification.dto.DeduplicatedUsersIdDto;
import com.luckyseven.notification.service.FcmService;
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

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {

    private final String USER_TO_NOTIFICATION_QUEUE = "user_to_notification.queue";
    private final String EVENT_TO_NOTIFICATION_QUEUE = "event_to_notification.queue";

    private final NotificationService notificationService;
    private final UserFeignClient userFeignClient;
    private final FcmService fcmService;

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


        InputStream inputStream = null;
        try {
//            System.out.println("dataSet.getTopic() : " + dataSet.getTopic() + "(" + dataSet.getTopic().getClass() + ") " + "Topic.DDAY_ALARM : " + Topic.DDAY_ALARM + "(" + Topic.DDAY_ALARM.getClass() + ")");
            if (dataSet.getTopic().equals(Topic.DDAY_ALARM)) {
                String json = null;
                Map<Integer, List<String>> fcmTargetDataSet = new HashMap<>();
                Map<Integer, String> eventPageUriMap = new HashMap<>();

                DeduplicatedUsersIdDto DUDdto = new DeduplicatedUsersIdDto();
                ObjectMapper om = new ObjectMapper();

                for (Object datum : (List) dataSet.getData()) {
                    json = om.writeValueAsString(datum);
                    DdayReceiveDto data = om.readValue(json, new TypeReference<DdayReceiveDto>() {
                    });


                    // 여기서 회원 정보를 보내서 fcm을 받아오는 로직을 처리해야하는데...
                    HashMap<String, List<String>> deduplicatedUserIdList = DUDdto.getHashMapData();

                    // 현재 데이터의 이벤트, 접속Uri
                    Integer curEventId = data.getEventId();
                    String curPageUri = data.getPageUri();

                    eventPageUriMap.put(curEventId,curPageUri);
                    List<String> curMembers = new ArrayList<>();

                    deduplicatedUserIdList.put(data.getCreater(), null);
                    curMembers.add(data.getCreater());

                    for (String joinMember : data.getJoinMembers()) {
                        deduplicatedUserIdList.put(joinMember, null);
                        curMembers.add(joinMember);
                    }
                    fcmTargetDataSet.put(curEventId,curMembers);

                    // List<userIdList>, 알림 type,
                    // 단체 일반 알림 보내기
                    notificationService.sendGroupNotification(curMembers, NotificationType.EVENT_OPEN,curEventId,curPageUri);


                }
//                System.out.println("*******fcmTargetDataSet********\n "+fcmTargetDataSet);
                // 보냄~~~~~
                Response response = userFeignClient.findAllUsersFcmToken(DUDdto);

//                log.info(" \n ** response => {} \n ", response);

                inputStream = response.body().asInputStream();


                // InputStream을 문자열로 변환한다.
                String responseBody = IOUtils.toString(inputStream, "UTF-8");
                inputStream.close();

//                    ObjectMapper om = new ObjectMapper();
                json = om.writeValueAsString(responseBody);
                DeduplicatedUsersIdDto lookupTable = om.readValue(json, new TypeReference<DeduplicatedUsersIdDto>() {
                });

//                log.info(" \n ** responseData => {}  \n(룩업으로 사용할 데이터)\n ", lookupTable);

                fcmService.DdayPushNotification(fcmTargetDataSet, lookupTable,eventPageUriMap);

            }
        } catch (IOException e) {
            log.error(e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }

    }
}
