package com.luckyseven.funding.service;

import com.luckyseven.funding.dto.FundingJoinReq;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingStatus;
import com.luckyseven.funding.entity.Sponsor;
import com.luckyseven.funding.entity.Transaction;
import com.luckyseven.funding.repository.FundingRepository;
import com.luckyseven.funding.repository.SponsorRepository;
import com.siot.IamportRestClient.exception.IamportResponseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SponsorServiceImpl implements SponsorService{
    private final SponsorRepository sponsorRepository;
    private final FundingRepository fundingRepository;
    private final TransactionService transactionService;
    @Override
    public int joinFunding(int fundingId, FundingJoinReq dto, String userId) throws IllegalStateException {
        Optional<Funding> optionalFunding = fundingRepository.findById(fundingId);
        Funding funding = optionalFunding.orElseThrow(() -> new NoSuchElementException("해당하는 펀딩 번호가 없습니다."));

        if(funding.getStatus() != FundingStatus.APPROVE) {
            //transactionService.cancelPayment(dto.getPgId());
            throw new IllegalStateException();
        }
        transactionService.verifiyAndSavePayment(dto.getTransactionId(), dto.getPgId(), dto.getAmount());

        final Sponsor data = Sponsor.builder()
                .funding(Funding.builder().fundingId(fundingId).build())
                .userId(userId)
                .amount(dto.getAmount())
                .nickname(dto.getNickname())
                .comment(dto.getComment())
                .transaction(Transaction.builder().transactionId(dto.getTransactionId()).build())
                .build();
        final Sponsor result = sponsorRepository.save(data);
        return result.getSponsorId();
    }

    @Override
    public String test(FundingJoinReq dto) throws IamportResponseException, IOException {
        return transactionService.verifiyAndSavePayment(dto.getTransactionId(), dto.getPgId(), dto.getAmount());
    }
}
