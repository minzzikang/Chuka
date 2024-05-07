package com.luckyseven.event.message.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BaseMessageDto {
    private String topic;
    private Object data;
}
