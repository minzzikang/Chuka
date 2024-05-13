package com.luckyseven.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FCMMessageDto {

    private String targetToken;
    private String content;
    private String body;
    private Map<String, String> data;
}
