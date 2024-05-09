package com.luckyseven.funding.message;

import com.luckyseven.funding.dto.FundingStatusAlarmDto;
import com.luckyseven.funding.dto.ProductInfoRes;
import com.luckyseven.funding.dto.Topic;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingStatus;
import com.luckyseven.funding.repository.FundingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;

/**
 * 펀딩 서버가 요청을 받는 코드는 여기에 작성해주세요 @RabbitListener 어노테이션을 달고 어떤 큐의 정보를 받을 것인지 설정하면 됩니다
 * 현재 파일로 알아보는 Message QUEUE 흐름도
 * provider(크롤링 서버에 작성 됨) -> Exchange(product.topic) -> QUEUE (product.queue) -> consumer(현재 파일)
 * 따라서 받는 입장에서는 *받고 싶은 QUEUE 이름*을 알면 됩니다
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {
    private final String PRODUCT_QUEUE = "product.queue";//어노테이션은 상수여야해서 설정에서 못 가져옴
    private final FundingRepository fundingRepository;
    private final ProducerService producerService;

    @Transactional
    @RabbitListener(queues = PRODUCT_QUEUE)
    public void receiveCrawlingMessage(ProductInfoRes productRes) {
        log.info(productRes.toString());


        Topic topic = Topic.FUNDING_DISAPPROVED;
        String userId = productRes.getUserId();
        Integer fundingId = productRes.getFundingId();

        Funding funding = fundingRepository.findById(productRes.getFundingId())
                .orElseThrow(NoSuchElementException::new);

        switch (productRes.getStatus()){
            case 200:
                topic=Topic.FUNDING_APPROVED;
                String productImageUrl = productRes.getProductImageUrl();
                funding.successCrawling(FundingStatus.APPROVE, productImageUrl, productRes.getProductName(), productRes.getProductPrice());
                break;
            case 400://상품 상세페이지를 다시 확인해주세요
                funding.failCrawling(FundingStatus.REJECT);
                break;
            case 401://지원하지 않는 쇼핑몰
                funding.failCrawling(FundingStatus.REJECT);
                break;
            case 500://크롤링 서버 에러
                funding.failCrawling(FundingStatus.REJECT);
                break;
            default:
                funding.failCrawling(FundingStatus.REJECT);

        }
        FundingStatusAlarmDto fundingStatusAlarmDto = new FundingStatusAlarmDto(userId,fundingId,topic);
        producerService.sendFundingStatusMessage(fundingStatusAlarmDto);

    }
}
