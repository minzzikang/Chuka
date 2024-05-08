package com.luckyseven.event.message.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BaseMessageDto {
    private Topic topic;
    private Object data;
}
