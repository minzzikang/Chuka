package com.luckyseven.notification.util.feign;

import com.luckyseven.notification.dto.DeduplicatedUsersIdDto;
import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;


//@FeignClient(name = "usersClient", url = "http://ec2-43-203-200-59.ap-northeast-2.compute.amazonaws.com:8081/api/v1")
@FeignClient(name = "usersClient", url = "http://localhost:8081/api/v1")
public interface UserFeignClient {

    @PostMapping("/users/notifications/fcm-token")
    Response findAllUsersFcmToken(DeduplicatedUsersIdDto dto);

}
