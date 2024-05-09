package com.luckyseven.notification.service;

import com.luckyseven.notification.dto.DeduplicatedUsersIdDto;
import org.springframework.scheduling.annotation.Async;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface FcmService {

    @Async
    void DdayPushNotification(Map<Integer, List<String>> fcmTargetDataSet, DeduplicatedUsersIdDto lookupTable, Map<Integer, String> eventPageUriMap) throws IOException;

}
