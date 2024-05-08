package com.luckyseven.notification.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BaseMessageDto {
    private String topic;
    private Object data;
}
