package com.luckyseven.user.message.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BaseMessageDto {

    private Topic topic;
    private Object data;

}