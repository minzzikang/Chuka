package com.luckyseven.funding.service;

import com.luckyseven.funding.entity.Transaction;
import com.luckyseven.funding.entity.TransactionStatus;
import com.luckyseven.funding.repository.TransactionRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.DuplicateFormatFlagsException;
import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    @Value("${portone.rest.api.key}")
    private String REST_API_KEY;
    @Value("${portone.rest.api.secert.key}")
    private String REST_API_SECERT_KEY;
    private final TransactionRepository transactionRepository;

    @Override
    public String verifiyAndSavePayment(String transactionId, String pgId, Integer amount) {
        if (transactionRepository.existsByTransactionIdOrPgId(transactionId, pgId)) {
            throw new IllegalCallerException("이미 결제된 건입니다.");
        }
        log.info("pgId: {}",pgId);
        final IamportClient iamportClient = new IamportClient(REST_API_KEY, REST_API_SECERT_KEY);
        try {
            IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(pgId);

            final int pgAmount = iamportResponse.getResponse().getAmount().intValue();
            final String pgTransactionId = iamportResponse.getResponse().getMerchantUid();
            final String pgStatus = iamportResponse.getResponse().getStatus();

            log.info("from PG DTO: PG Amount: {}, PG Transaction ID: {}, PG Status: {}", pgAmount, pgTransactionId, pgStatus);
            log.info("from frontpage DTO:  PG Amount: {}, PG Transaction ID: {}", amount, transactionId);
            log.info("pgAmount vs Amount {}",pgAmount == amount);
            log.info("pgTransactionId vs TransactionId {}",pgTransactionId.equals(transactionId));
            if (!pgStatus.equals("paid")) {
                throw new IllegalCallerException("결제 오류입니다.");
            }

            if (pgAmount == amount && pgTransactionId.equals(transactionId)) {
                final Transaction data = Transaction.builder()
                        .transactionId(transactionId)
                        .pgName("portone")
                        .amount(amount)
                        .pgId(pgId)
                        .status(TransactionStatus.PAID)
                        .build();
                final Transaction result = transactionRepository.save(data);
                return result.getTransactionId();
            } else {
                throw new IllegalCallerException("정상적이지 않은 결제입니다.");
            }
        } catch (IamportResponseException e) {
            switch (e.getHttpStatusCode()) {
                case 401:
                    throw new AuthorizationServiceException("PG사 인증 오류입니다.");
                case 404:
                    throw new NoSuchElementException("해당하는 거래가 없습니다."+ e.getMessage());
                case 500:
                    throw new RuntimeException("PG사 서버 에러");
                default:
                    throw new RuntimeException(e.getMessage());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Boolean cancelPayment(String pgId){
        final IamportClient iamportClient = new IamportClient(REST_API_KEY, REST_API_SECERT_KEY);
        //TODO 미완성코드
        return true;
    }
}
