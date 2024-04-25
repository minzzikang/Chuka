package com.luckyseven.notification.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class FcmSendDto {

    private String token;
    private String title;
    private String body;


}
