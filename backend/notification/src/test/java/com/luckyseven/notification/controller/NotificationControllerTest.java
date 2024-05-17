//package com.luckyseven.notification.controller;
//
//import com.luckyseven.notification.documents.Notification;
//import com.luckyseven.notification.documents.NotificationType;
//import com.luckyseven.notification.service.NotificationService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Nested;
//import org.junit.jupiter.api.Test;
//import org.mockito.BDDMockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
////@Nested
//@WebMvcTest(NotificationController.class)
//class NotificationControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private NotificationService notificationService;
//
//    @Test
//    @DisplayName("회원 알림 조회")
//    void findAllNotificationsByUserId() throws Exception {
//        // given
//        String loggedInUser = "3452659543";
//
//        Notification noti1 = new Notification(loggedInUser, NotificationType.EVENT_OPEN);
//        noti1.setEventTitle("테스트 이벤트 타이틀 1");
//        noti1.setEventId(1);
//        noti1.setPageUri("페이지주소");
//        Notification noti2 = new Notification(loggedInUser, NotificationType.FUNDING_COMPLETE);
//        noti2.setFundingId(2);
//        List<Notification> mockNotifications = List.of(noti1, noti2);
//
//        // when
//        BDDMockito.given(notificationService.findAllByUserId(loggedInUser)).willReturn(mockNotifications);
//
//        // then
//        mockMvc.perform(get("/api/v1/notifications")
//                        .header("loggedInUser", loggedInUser))
//                .andExpect(status().isOk())
//                .andDo(print());
//    }
//
//
////    @Test
////    @DisplayName("알림 발신")
////    void sendNotification() {
////    }
////
////    @Test
////    @DisplayName("알림 단일 삭제")
////    void deleteByNotificationId() {
////    }
////
////    @Test
////    @DisplayName("알림 전체 삭제")
////    void deleteAllByUserId() {
////    }
//}