package com.luckyseven.user.util.feign;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "notificationClient", url = "http://ec2-43-203-200-59.ap-northeast-2.compute.amazonaws.com:8082/api/v1/notifications")
public interface NotificationFeignClient {

    @DeleteMapping
    Response deleteAllByUserId(@RequestHeader("loggedInUser") String userId);

}
