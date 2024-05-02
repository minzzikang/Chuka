package com.luckyseven.funding.message;

import com.luckyseven.funding.dto.ProductInfoRes;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingStatus;
import com.luckyseven.funding.repository.FundingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

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

    @Transactional
    @RabbitListener(queues = PRODUCT_QUEUE)
    public void receiveCrawlingMessage(ProductInfoRes productRes) {
        Funding funding = fundingRepository.findById(productRes.getFundingId())
                .orElseThrow(NoSuchElementException::new);
        if(productRes.getStatus() != 200){
                funding.failCrawling(FundingStatus.REJECT);
                //여기서 알림 서버에 거절되었다는걸 보내는 것을 작성해야함
                return;
        }

        String productImageUrl = productRes.getProductImageUrl();
        //S3전문가님 productImageUrl에 S3에 저장하고 나온 주소를 넣어주세요~~! 부탁드립니다-지연
        funding.successCrawling(FundingStatus.AFTER, productImageUrl, productRes.getProductName(), productRes.getProductPrice());
    }
}
