package com.luckyseven.funding.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class ProductCrawlingReq{
    private Integer fundingId;
    private String productUrl;
    private String userId;
}
