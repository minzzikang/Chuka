package com.luckyseven.event.util.feignClient;


import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "eventClient", url = "http://k10c107.p.ssafy.io:8083/api/v1/fundings")
//@FeignClient(name = "eventClient", url = "http://localhost:8083/api/v1/fundings")
public interface FundingFeignClient {

    @DeleteMapping("/eventId/{eventId}")
    Response deleteFunding(@PathVariable int eventId);

}
