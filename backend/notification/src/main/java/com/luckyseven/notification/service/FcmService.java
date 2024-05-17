package com.luckyseven.notification.service;

import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.dto.DeduplicatedUsersIdDto;
import com.luckyseven.notification.dto.RollingpaperCreatAlarmDto;
import org.springframework.scheduling.annotation.Async;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface FcmService {

    @Async
    void DdayPushNotification(Map<Integer, List<String>> fcmTargetDataSet, DeduplicatedUsersIdDto lookupTable, Map<Integer, String> eventPageUriMap, Map<Integer, String> eventTitleMap) throws IOException;

    @Async
    void fundingStatusNotification(List<String> userFcmTokenList, String body, Integer fundingId, NotificationType type) throws IOException;


    @Async
    void sendRollingCreateFcm(List<String> fcmTokenList, RollingpaperCreatAlarmDto data);
}
