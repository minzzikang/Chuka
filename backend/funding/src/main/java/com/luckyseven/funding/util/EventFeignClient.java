package com.luckyseven.funding.util;

import com.luckyseven.funding.dto.EventDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "eventclient", url = "http://k10c107.p.ssafy.io:8084/api/v1/events/")
public interface EventFeignClient {
    //이벤트 정보 조회
    @GetMapping("{eventId}")
    EventDto getEvent(@PathVariable int eventId);
}
