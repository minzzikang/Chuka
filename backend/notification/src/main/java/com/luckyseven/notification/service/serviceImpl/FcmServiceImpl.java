package com.luckyseven.notification.service.serviceImpl;

import com.luckyseven.notification.commons.notification.NotificationResponseDescription;
import com.luckyseven.notification.dto.DeduplicatedUsersIdDto;
import com.luckyseven.notification.dto.FCMMessageDto;
import com.luckyseven.notification.service.FcmService;
import com.luckyseven.notification.util.fcm.FcmSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class FcmServiceImpl implements FcmService {

    @Autowired
    private FcmSender fcmSender;

    @Async
    @Override
    public void DdayPushNotification(Map<Integer, List<String>> fcmTargetDataSet, DeduplicatedUsersIdDto lookupTableDto) throws IOException {
        String content = NotificationResponseDescription.EVENT_OPEN;

        HashMap<String, List<String>> lookupTable = lookupTableDto.getHashMapData();

        Set<Integer> eventSet = fcmTargetDataSet.keySet();

        for (Integer event : eventSet) {

            FCMMessageDto fcmMessageDto = new FCMMessageDto(); // content => 타입으로 결정, data => eventId;
            fcmMessageDto.setContent(content);
            Map<String, String> data = new HashMap<>(); // eventId

            data.put("eventId", event.toString());
            fcmMessageDto.setData(data);
            List<String> eventMembers = fcmTargetDataSet.get(event);
            for (String eventMember : eventMembers) {
                List<String> eventMemberTokens = lookupTable.get(eventMember);
                System.out.println("*************** eventMemberTokens = " + eventMemberTokens);
                if (eventMemberTokens == null || eventMemberTokens.size() == 0) continue;
                for (String eventMemberToken : eventMemberTokens) {
                    fcmMessageDto.setTargetToken(eventMemberToken);
                    fcmSender.sendMessageTo(fcmMessageDto);
                }
            }

        }


    }
}
