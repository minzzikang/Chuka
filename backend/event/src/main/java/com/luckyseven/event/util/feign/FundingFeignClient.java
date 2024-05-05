package com.luckyseven.event.util.feign;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "fundingClient", url = "http://k10c107.p.ssafy.io:8083/api/v1/fundings")
public interface FundingFeignClient {

    @DeleteMapping("/eventId/{eventId}")
    Response deleteFundingByEventId(@PathVariable int eventId);

}
