package com.luckyseven.funding.client;

import com.luckyseven.funding.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "userclient", url = "${feignclient.user-baseUrl-v1}")
public interface UserFeignClient {
    //회원 정보 조회
    @GetMapping("{userId}")
    UserDto getUser(@PathVariable String userId);
}
