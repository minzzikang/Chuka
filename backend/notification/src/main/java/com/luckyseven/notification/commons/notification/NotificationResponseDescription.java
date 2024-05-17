package com.luckyseven.notification.commons.notification;

public interface NotificationResponseDescription {

    String EVENT_CREATE = "ㅊㅋ가 등록되었습니다.";

    String FUNDING_COMPLETE = "펀딩이 완료되었습니다."; // 펀딩 완료
    String EVENT_OPEN= "ㅊㅋ D-day!! ";
    String FUNDING_APPROVED ="펀딩 등록이 승인되었습니다."; // 펀딩 승인, 등록
    String FUNDING_DISAPPROVED ="펀딩 등록이 거절되었습니다."; // 펀딩 승인, 등록

    String ROLLING_CREATE = "이벤트에 새로운 메시지가 등록되었습니다.";
}
