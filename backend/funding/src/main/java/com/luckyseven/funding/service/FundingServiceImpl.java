package com.luckyseven.funding.service;

import com.luckyseven.funding.client.UserFeignClient;
import com.luckyseven.funding.dto.*;
import com.luckyseven.funding.entity.Funding;
import com.luckyseven.funding.entity.FundingResult;
import com.luckyseven.funding.entity.FundingStatus;
import com.luckyseven.funding.entity.Sponsor;
import com.luckyseven.funding.exception.NotLoggedInUserException;
import com.luckyseven.funding.message.ProducerService;
import com.luckyseven.funding.repository.FundingRepository;
import com.luckyseven.funding.client.EventFeignClient;
import com.luckyseven.funding.util.ImageUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;

import static com.luckyseven.funding.dto.FundingCreateReq.getNullPropertyNames;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FundingServiceImpl implements FundingService {
    private final FundingRepository fundingRepository;
    private final EventFeignClient eventFeignClient;
    private final ProducerService producerService;
    private final UserFeignClient userFeignClient;
    private final ImageUtil imageUtil;
    private final String DEFAULT_PROFILE_IMAGE_URL = "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640";

    @Override
    public int createFunding(final FundingCreateReq dto, String userId) throws IllegalAccessException {
        //해당 이벤트 번호가 있는지 확인 && 해당 이벤트 만든 사람과 펀딩 만드는 사람이 같은지 확인
        EventDto eventDto = eventFeignClient.getEvent(dto.getEventId());
        if(!eventDto.getUserId().equals(userId)){
            //FIXME 로그지우기
            log.info(eventDto.toString());
            log.info(userId);
            throw new IllegalAccessException("이벤트를 만든 사람과 일치하지 않습니다");
        }

        //이러면 pending이 여러개 있을 때는 체크 불가능
        if(fundingRepository.countByEventIdAndStatus(dto.getEventId(),FundingStatus.APPROVE)>3){
            throw new IllegalStateException();
        }

        final Funding data = Funding.builder()
                .eventId(dto.getEventId())
                .productLink(dto.getProductLink())
                .introduce(dto.getIntroduce())
                .goalAmount(dto.getGoalAmount())
                .option(dto.getOption())
                .receiverName(dto.getReceiverName())
                .receiverPhone(dto.getReceiverPhone())
                .postalCode(dto.getPostalCode())
                .address(dto.getAddress())
                .addressDetail(dto.getAddressDetail())
                .endDate(dto.getEndDate())
                .userId(userId)
                .build();
        final Funding result = fundingRepository.save(data);
        producerService.sendCrawlingMessage(result.getFundingId(),result.getProductLink(),userId);
        return result.getFundingId();
    }

    @Override
    public List<FundingRes> findFundings(final int eventId) {
        final List<Funding> fundingList = fundingRepository.findByEventIdAndStatusOrderByResultAsc(FundingStatus.APPROVE,eventId);

        return fundingList.stream()
                .map(FundingRes::of)
                .toList();
    }

    @Override
    public FundingDetailRes getFunding(final int fundingId) {
        final Funding funding = fundingRepository.findById(fundingId)
                .orElseThrow(() -> new NoSuchElementException(fundingId+"에 해당하는 펀딩이 없습니다."));
        List<Sponsor> sponsorList = funding.getSponsorList();
        List<SponsorRes> sponsorsResList = sponsorList.stream()
                .map(sponsor -> {
                    UserDto userDto = null;
                    String profileImage = "";

                    try {
                        userDto = userFeignClient.getUser(sponsor.getUserId());
                    } catch (Exception e) {
                        e.printStackTrace();
                        profileImage = DEFAULT_PROFILE_IMAGE_URL;   //회원 정보를 불러오지 못한 경우 (유효하지 않은 회원 ID)
                    }

                    //유효한 프로필 이미지 URL
                    if(imageUtil.isImageUrlValidModerate(userDto.getProfileImage())) {
                        profileImage = userDto.getProfileImage();
                    //유효하지 않은 프로필 이미지 URL
                    } else {
                        profileImage = DEFAULT_PROFILE_IMAGE_URL;
                    }

                    return SponsorRes.of(sponsor, profileImage);
                })
                .toList();
        final int nowFundingAmount = sponsorList.stream()
                .mapToInt(Sponsor::getAmount)
                .sum();
        EventDto eventDto = eventFeignClient.getEvent(funding.getEventId());

        return FundingDetailRes.of(funding, nowFundingAmount, sponsorsResList, eventDto.getDate(), eventDto.getTitle());
    }

    @Override
    public List<FundingRes> getMyFunding(String userId) {
        final List<Funding> fundingList = fundingRepository.findAllByUserId(userId);
        // DB 컬럼 변경 -> FundingRes 변경-> 여기 변경, 이런 일이 있었습니다 -지연
        return fundingList.stream()
                .map(FundingRes::of)
                .toList();
    }

    @Override
    @Deprecated
    public Funding modifyFunding(final int fundingId, final FundingCreateReq dto, String userId) throws EntityNotFoundException, IllegalAccessException{
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(EntityNotFoundException::new);

        //작성자와 수정을 시도하려는 사람의 ID 일치 여부 확인
        if(!userId.equals(funding.getUserId())) {
            throw new IllegalAccessException();
        }

        dto.setEventId(funding.getEventId());                                   //eventId는 변조되어서는 안됨
        BeanUtils.copyProperties(dto, funding, getNullPropertyNames(dto));      //null인 Field 제외하고 값 복사

        funding = fundingRepository.save(funding);

        return funding;
    }

    @Override
    public void stopFundings(int fundingId, String userId) throws NotLoggedInUserException, EntityNotFoundException {
        //레코드 없음 -> 404 응답
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(() -> new EntityNotFoundException()); //람다 표현식 필요

        //작성자와 수정을 시도하려는 사람의 ID 불일치 -> 401 응답
        if(!userId.equals(funding.getUserId())) {
            log.info("펀딩 정보 삭제 권한 없음 (로그인 유저 불일치)");
            throw new NotLoggedInUserException();
        }

        if(!funding.getSponsorList().isEmpty()) {
            funding.setStatus(FundingStatus.STOP);
            fundingRepository.save(funding);
        }
    }

    @Override
    public void deleteFundings(int fundingId, String userId) throws NotLoggedInUserException, IllegalStateException, EntityNotFoundException {
        //레코드 없음 -> 404 응답
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(() -> new EntityNotFoundException()); //람다 표현식 필요

        //작성자와 수정을 시도하려는 사람의 ID 불일치 -> 401 응답
        if(!userId.equals(funding.getUserId())) {
            log.info("펀딩 정보 삭제 권한 없음 (로그인 유저 불일치)");
            throw new NotLoggedInUserException();
        }

        if(!funding.getSponsorList().isEmpty()) {
            //참여했으면 중지 -> 403 응답
            throw new IllegalStateException();
        } else {
            //참여 안 했으면 삭제 가능 -> 200 응답
            fundingRepository.delete(funding);
        }
    }

    @Override
    public void deleteFundingsByEventId(int eventId) throws IllegalStateException, EntityNotFoundException {
        List<Funding> fundingList = fundingRepository.findAllByEventId(eventId);

        if(fundingList.isEmpty()) {
            //레코드 없음 -> 404 응답
            //throw new EntityNotFoundException();
            return;
        }

        for(Funding funding : fundingList) {
            if(!funding.getSponsorList().isEmpty()) {
                //참여했으면 중지 -> 403 응답
                throw new IllegalStateException();
            }
        }

        for(Funding funding : fundingList) {
            //참여 안 했으면 삭제 가능 -> 200 응답
            fundingRepository.delete(funding);
        }
    }
}
