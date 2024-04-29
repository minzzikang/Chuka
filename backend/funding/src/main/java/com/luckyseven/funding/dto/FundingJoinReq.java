package com.luckyseven.funding.dto;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FundingJoinReq {
    private String nickname;
    private String comment;
    private Integer amount;
}
