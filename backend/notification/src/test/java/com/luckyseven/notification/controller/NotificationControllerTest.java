package com.luckyseven.notification.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.notification.documents.Notification;
import com.luckyseven.notification.documents.NotificationType;
import com.luckyseven.notification.dto.receiverInfoDto;
import com.luckyseven.notification.service.NotificationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@Nested

@WebMvcTest(NotificationController.class)
class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private NotificationService notificationService;

    @Test
    @WithMockUser(value = "user")
    @DisplayName("회원 알림 조회")
    void findAllNotificationsByUserId() throws Exception {
        // given
        String loggedInUser = "3452659543";

        Notification noti1 = new Notification(loggedInUser, NotificationType.EVENT_OPEN);
        noti1.setEventTitle("테스트 이벤트 타이틀 1");
        noti1.setEventId(1);
        noti1.setPageUri("페이지주소");
        Notification noti2 = new Notification(loggedInUser, NotificationType.FUNDING_COMPLETE);
        noti2.setFundingId(2);
        List<Notification> mockNotifications = List.of(noti1, noti2);

        // when
        // notificationService.findAllByUserId(loggedInUser)가 호출될 때
        // mockNotifications를 반환하도록 모의 객체를 설정합니다.
        BDDMockito.given(notificationService.findAllByUserId(loggedInUser)).willReturn(mockNotifications);

        // then
        // mockMvc를 사용하여 "/api/v1/notifications" 엔드포인트에 GET 요청을 보냅니다.
        // 요청 헤더에 "loggedInUser"를 설정합니다.
        // 응답이 HTTP 200 상태인지 확인하고, 결과를 출력합니다.
        ResultActions resultActions = mockMvc.perform(get("/api/v1/notifications")
                        .header("loggedInUser", loggedInUser))
                .andExpect(status().isOk())
                .andDo(print());

        // 응답의 JSON 구조와 필드 값을 확인합니다.
        resultActions.andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].userId").value(loggedInUser))
                .andExpect(jsonPath("$[0].type").value(NotificationType.EVENT_OPEN.toString()))
                .andExpect(jsonPath("$[0].eventTitle").value("테스트 이벤트 타이틀 1"))
                .andExpect(jsonPath("$[0].eventId").value(1))
                .andExpect(jsonPath("$[0].pageUri").value("페이지주소"))
                .andExpect(jsonPath("$[1].userId").value(loggedInUser))
                .andExpect(jsonPath("$[1].type").value(NotificationType.FUNDING_COMPLETE.toString()))
                .andExpect(jsonPath("$[1].fundingId").value(2));
    }


    @Test
    @WithMockUser(value = "user")
    @DisplayName("알림 발신")
    void sendNotification() throws Exception {
        // given
        String loggedInUser = "3452659543";
        receiverInfoDto receiverInfoDto = new receiverInfoDto();
        receiverInfoDto.setType(NotificationType.EVENT_CREATE);
        receiverInfoDto.setUserId(loggedInUser);

        // when
//        BDDMockito.given(notificationService.findAllByUserId(loggedInUser)).willReturn(mockNotifications);
//        BDDMockito.given(notificationService.sendNotification(loggedInUser,NotificationType.EVENT_CREATE));

//        // then
//        mockMvc.perform(post("/api/v1/notifications")
//                        .header("loggedInUser", loggedInUser)
//                        .param("receiverInfo", String.valueOf(receiverInfoDto))) // RequestParam
//                .andExpect(status().isOk());
// then
        mockMvc.perform(post("/api/v1/notifications")
                        .header("loggedInUser", loggedInUser)
                        .contentType("application/json")
//                        .content(objectMapper.writeValueAsString(receiverInfoDto))
//                        .param("receiverInfo",objectMapper.writeValueAsString(receiverInfoDto))
                        .param("receiverInfo",String.valueOf(receiverInfoDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

    }
//
//    @Test
//    @WithMockUser(value = "user")
//    @DisplayName("알림 단일 삭제")
//    void deleteByNotificationId() {
//    }
//
//    @Test
//    @WithMockUser(value = "user")
//    @DisplayName("알림 전체 삭제")
//    void deleteAllByUserId() {
//    }
}