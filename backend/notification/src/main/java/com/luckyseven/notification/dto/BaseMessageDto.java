package com.luckyseven.notification.dto;

import com.luckyseven.notification.message.dto.Topic;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BaseMessageDto {
    private Topic topic;
    private Object data;
}
