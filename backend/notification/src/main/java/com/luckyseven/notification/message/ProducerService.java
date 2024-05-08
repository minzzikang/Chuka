//package com.luckyseven.notification.message;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.luckyseven.notification.dto.BaseMessageDto;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
///**
// * 현재 서버가 요청을 보내는 코드는 여기에 작성해주세요
// * 현재 파일로 알아보는 Message QUEUE 흐름도
// * provider(현재 파일) -> Exchange(crawling.topic) -> QUEUE (crawling.queue) -> consumer(크롤링 서버에 작성 됨)
// * 따라서 보내는 입장에서는 *보내고 싶은 Exchange 이름*을 알면 됩니다
// */
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class ProducerService {
//    private final RabbitTemplate rabbitTemplate;
//
//
//}