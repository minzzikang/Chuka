package com.luckyseven.funding.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//FIXME: 테스트 중 annotation
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FundingCreateReq {
    private Integer eventId;

    private String productLink;

    private String introduce;

    private Integer goalAmount;

    private String option;

    private String receiverName;

    private String receiverPhone;

    private String postalCode;

    private String address;

    private String addressDetail;

    private LocalDate endDate;

    //TODO: 테스트 중
    public static String[] getNullPropertyNames (Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for(java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }

        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
