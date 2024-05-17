package com.luckyseven.notification.message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.notification.commons.notification.NotificationResponseDescription;
import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.dto.*;
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
    private final String FUNDING_TO_NOTIFICATION_QUEUE = "funding_to_notification.queue";

    private final NotificationService notificationService;
    private final UserFeignClient userFeignClient;
    private final FcmService fcmService;

    @Transactional
    @RabbitListener(queues = FUNDING_TO_NOTIFICATION_QUEUE)
    public void receiveFundingMessage(FundingToNotificationDto fundingToNotificationDto) {
        log.info("fundingToNotificationDto : {}", fundingToNotificationDto);

        try {

            Topic topic = fundingToNotificationDto.getTopic();
            NotificationType type = null;
            String body = null;
            Integer fundingId = fundingToNotificationDto.getFundingId();
            String userId = fundingToNotificationDto.getUserId();

            if (topic.equals(Topic.FUNDING_APPROVED)) {
                type = NotificationType.FUNDING_APPROVED;
                body = NotificationResponseDescription.FUNDING_APPROVED;

            } else if (topic.equals(Topic.FUNDING_DISAPPROVED)) { // 펀딜 실패한 경우.
                type = NotificationType.FUNDING_DISAPPROVED;
                body = NotificationResponseDescription.FUNDING_DISAPPROVED;
            } else if (topic.equals(Topic.FUNDING_COMPLETE)) {
                type = NotificationType.FUNDING_COMPLETE;
                body = NotificationResponseDescription.FUNDING_COMPLETE;

            }

            FundingToNotificationMessageDto fundingToNotificationMessageDto = new FundingToNotificationMessageDto();
            fundingToNotificationMessageDto.setFundingId(fundingId);
            fundingToNotificationMessageDto.setUserId(userId);
            fundingToNotificationMessageDto.setType(type);
            fundingToNotificationMessageDto.setBody(body);

            // 일반 알림
            notificationService.sendFundingNotification(fundingToNotificationMessageDto);

            // fcmToken받아오기.
            List<String> userFcmTokenList = sendGetFcmTokenReq(userId);


            // fcm알림
            fcmService.fundingStatusNotification(userFcmTokenList, body, fundingId,type);


        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    private List<String> sendGetFcmTokenReq(String userId) throws IOException {
        Response response = userFeignClient.getUserFcmToken(userId);

        ObjectMapper om = new ObjectMapper();
        InputStream inputStream = null;
        inputStream = response.body().asInputStream();
        // InputStream을 문자열로 변환한다.
        String responseBody = IOUtils.toString(inputStream, "UTF-8");
        inputStream.close();


        return om.readValue(responseBody, new TypeReference<List<String>>() {
        });
    }


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
        try {

            if (dataSet.getTopic().equals(Topic.DDAY_ALARM)) {
                sendDdayFcm(dataSet);
            } else if (dataSet.getTopic().equals(Topic.EVENT_CREATE)) {
                sendEventCreateFcm(dataSet);

            } else if (dataSet.getTopic().equals(Topic.ROLLING_CREATE)) {
                sendRollingCreateFcm(dataSet);

            }
        } catch (IOException e) {
            log.error(e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }

    }

    private void sendRollingCreateFcm(BaseMessageDto dataSet) throws IOException {
        InputStream inputStream = null;
        ObjectMapper om = new ObjectMapper();
        String json = om.writeValueAsString(dataSet.getData());
        RollingpaperCreatAlarmDto data = om.readValue(json, new TypeReference<RollingpaperCreatAlarmDto>() {
        });

        // 일반알림
        notificationService.sendRollingCreate(data);

        List<String> fcmTokenList = sendGetFcmTokenReq(data.getUserId());

        // fcm
        fcmService.sendRollingCreateFcm(fcmTokenList,data);


    }

    private void sendEventCreateFcm(BaseMessageDto dataSet) throws JsonProcessingException {
//        System.out.println(dataSet.getData());
        InputStream inputStream = null;
        ObjectMapper om = new ObjectMapper();
        String json = om.writeValueAsString(dataSet.getData());
        EventCreateAlarmDto data = om.readValue(json, new TypeReference<EventCreateAlarmDto>() {
        });

        notificationService.sendNotification(data);

    }

    private void sendDdayFcm(BaseMessageDto dataSet) throws IOException {
        String json = null;
        InputStream inputStream = null;

        Map<Integer, List<String>> fcmTargetDataSet = new HashMap<>();
        Map<Integer, String> eventPageUriMap = new HashMap<>();
        Map<Integer, String> eventTitleMap = new HashMap<>();

        DeduplicatedUsersIdDto DUDdto = new DeduplicatedUsersIdDto();
        ObjectMapper om = new ObjectMapper();

        for (Object datum : (List) dataSet.getData()) {
            json = om.writeValueAsString(datum);
            DdayReceiveDto data = om.readValue(json, new TypeReference<DdayReceiveDto>() {
            });

            HashMap<String, List<String>> deduplicatedUserIdList = DUDdto.getHashMapData();

            // 현재 데이터의 이벤트, 접속Uri
            Integer curEventId = data.getEventId();
            String curPageUri = data.getPageUri();
            String curTitle = data.getTitle();

            eventPageUriMap.put(curEventId, curPageUri);
            eventTitleMap.put(curEventId, curTitle);
            List<String> curMembers = new ArrayList<>();

            deduplicatedUserIdList.put(data.getCreater(), null);
            curMembers.add(data.getCreater());

            for (String joinMember : data.getJoinMembers()) {
                deduplicatedUserIdList.put(joinMember, null);
                curMembers.add(joinMember);
            }
            fcmTargetDataSet.put(curEventId, curMembers);

            // 단체 일반 알림 보내기
            notificationService.sendGroupNotification(curMembers, NotificationType.EVENT_OPEN, curEventId, curPageUri,curTitle);


        }
        Response response = userFeignClient.findAllUsersFcmToken(DUDdto);
        inputStream = response.body().asInputStream();
        String responseBody = IOUtils.toString(inputStream, "UTF-8");
        inputStream.close();

        json = om.writeValueAsString(responseBody);
        DeduplicatedUsersIdDto lookupTable = om.readValue(json, new TypeReference<DeduplicatedUsersIdDto>() {
        });


        fcmService.DdayPushNotification(fcmTargetDataSet, lookupTable, eventPageUriMap,eventTitleMap);
    }
}
