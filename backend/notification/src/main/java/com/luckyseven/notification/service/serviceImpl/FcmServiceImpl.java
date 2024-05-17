package com.luckyseven.notification.service.serviceImpl;

import com.luckyseven.notification.commons.notification.NotificationResponseDescription;

import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.dto.DeduplicatedUsersIdDto;
import com.luckyseven.notification.dto.FCMMessageDto;
import com.luckyseven.notification.dto.RollingpaperCreatAlarmDto;
import com.luckyseven.notification.service.FcmService;
import com.luckyseven.notification.util.fcm.FcmSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@Service
public class FcmServiceImpl implements FcmService {

    @Autowired
    private FcmSender fcmSender;

    @Async
    @Override
    public void DdayPushNotification(Map<Integer, List<String>> fcmTargetDataSet, DeduplicatedUsersIdDto lookupTableDto, Map<Integer, String> eventPageUriMap, Map<Integer, String> eventTitleMap) throws IOException {
        String content = NotificationResponseDescription.EVENT_OPEN;

//        System.out.println("eventPageUriMap ==> "+eventPageUriMap);

        HashMap<String, List<String>> lookupTable = lookupTableDto.getHashMapData();

        Set<Integer> eventSet = fcmTargetDataSet.keySet();

        for (Integer event : eventSet) {
            String curPageUri = eventPageUriMap.get(event);
            String cuTitle = eventTitleMap.get(event);
            FCMMessageDto fcmMessageDto = new FCMMessageDto(); // content => 타입으로 결정, data => eventId;
            fcmMessageDto.setContent(content);
            fcmMessageDto.setBody(cuTitle);
            Map<String, String> data = new HashMap<>(); // eventId

            data.put("eventId", event.toString());
            data.put("pageUri", curPageUri);
            data.put("type", NotificationType.EVENT_OPEN.toString());
            fcmMessageDto.setData(data);
            List<String> eventMembers = fcmTargetDataSet.get(event);
            for (String eventMember : eventMembers) {
                List<String> eventMemberTokens = lookupTable.get(eventMember);
//                System.out.println("*************** eventMemberTokens = " + eventMemberTokens);
                if (eventMemberTokens == null || eventMemberTokens.size() == 0) continue;
                for (String eventMemberToken : eventMemberTokens) {
                    fcmMessageDto.setTargetToken(eventMemberToken);
                    // fcm발생.
                    fcmSender.sendMessageTo(fcmMessageDto);
                }
            }

        }


    }

    @Override
    public void fundingStatusNotification(List<String> userFcmTokenList, String body, Integer fundingId, NotificationType type) throws IOException {
//        log.info("userFcmTokenList : {}",userFcmTokenList);
        try {
            for (String token : userFcmTokenList) {
                FCMMessageDto fcmMessageDto = new FCMMessageDto();
                Map<String ,String > data = new HashMap<>();
                data.put("fundingId",fundingId.toString());
                data.put("type", type.toString());
                fcmMessageDto.setContent(body);
                fcmMessageDto.setTargetToken(token);
                fcmMessageDto.setData(data);

                fcmSender.sendMessageTo(fcmMessageDto);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void sendRollingCreateFcm(List<String> fcmTokenList, RollingpaperCreatAlarmDto data) {

        try {
            for (String token : fcmTokenList) {
                FCMMessageDto fcmMessageDto = new FCMMessageDto();
                Map<String ,String > dataset = new HashMap<>();
                dataset.put("eventId", String.valueOf(data.getEventId()));
                dataset.put("pageUri",data.getPageUri());
                dataset.put("type", NotificationType.ROLLING_CREATE.toString());
                fcmMessageDto.setContent((data.getEventTitle()+" "+NotificationResponseDescription.ROLLING_CREATE));
                fcmMessageDto.setTargetToken(token);
                fcmMessageDto.setData(dataset);

                fcmSender.sendMessageTo(fcmMessageDto);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }


}
