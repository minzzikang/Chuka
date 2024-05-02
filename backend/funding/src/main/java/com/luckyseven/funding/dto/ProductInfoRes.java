package com.luckyseven.funding.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.io.Serializable;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProductInfoRes implements Serializable {
    private Integer fundingId;
    private String productImageUrl;
    private Integer productPrice;
    private String productName;
    private Integer status;
    private String message;
}
