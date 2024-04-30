package com.luckyseven.funding.controller;

import com.luckyseven.funding.dto.FundingCreateReq;
import com.luckyseven.funding.dto.FundingDetailRes;
import com.luckyseven.funding.dto.FundingJoinReq;
import com.luckyseven.funding.dto.FundingRes;
import com.luckyseven.funding.service.FundingService;
import com.luckyseven.funding.service.SponsorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/fundings")
public class FundingController {
    private final FundingService fundingService;
    private final SponsorService sponsorService;

    @PostMapping
    @Operation(
            summary = "펀딩 등록",
            description = "<strong>eventId</strong>를 꼭 담아서 보내주세요.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> createFunding(@RequestBody final FundingCreateReq dto, @RequestHeader("loggedInUser") String userId) {
        try {
            //log.debug(dto.toString());
            final int fundingId = fundingService.createFunding(dto, userId);
            return ResponseEntity.status(HttpStatus.OK).body(fundingId);
        } catch (Exception e) {
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/events/{eventId}")
    @Operation(
            summary = "이벤트에 해당하는 펀딩 목록",
            description = "<strong>eventId</strong>를 통해 ✨<strong>승인</strong>✨된 펀딩 목록을 볼 수 있다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> getFundingList(@PathVariable("eventId") final int eventId) {
        try {
            //log.debug(String.valueOf(eventId));
            final List<FundingRes> fundingResList = fundingService.findFundings(eventId);
            return ResponseEntity.status(HttpStatus.OK).body(fundingResList);
        } catch (Exception e) {
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/{fundingId}")
    @Operation(
            summary = "펀딩 단건 조회",
            description = "<strong>fundingId</strong>를 통해 자세한 펀딩을 볼 수 있다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "해당 펀딩이 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> getFunding(@PathVariable("fundingId") final int fundingId) {
        try {
            FundingDetailRes fundingDetailRes = fundingService.getFunding(fundingId);
            return ResponseEntity.status(HttpStatus.OK).body(fundingDetailRes);
        } catch (NoSuchElementException e) {
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/{fundingId}")
    @Operation(
            summary = "펀딩 단건 등록",
            description = "실제 api를 요청할 때는 <strong>loggedInUser</strong>가 아니라 헤더에 토큰을 담아보내주세요. <strong>loggedInUser</strong>는 백엔드 게이트웨이에서 토큰을 바꿔서 보낼 예정입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> joinFunding(@PathVariable("fundingId") final int fundingId, @RequestBody final FundingJoinReq dto, @RequestHeader("loggedInUser") String userId) {
        try {
            final int sponsorId = sponsorService.joinFunding(fundingId, dto, userId);
            return ResponseEntity.status(HttpStatus.OK).body(sponsorId);
        } catch (Exception e) {
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/me")
    @Operation(
            summary = "나의 펀딩 조회",
            description = "실제 api를 요청할 때는 <strong>loggedInUser</strong>가 아니라 헤더에 토큰을 담아보내주세요. <strong>loggedInUser</strong>는 백엔드 게이트웨이에서 토큰을 바꿔서 보낼 예정입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> getmyFundings(@RequestHeader("loggedInUser") String userId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(fundingService.getMyFunding(userId));
        } catch (Exception e) {
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
