package com.luckyseven.funding.controller;

import com.luckyseven.funding.dto.FundingCreateReq;
import com.luckyseven.funding.dto.FundingDetailRes;
import com.luckyseven.funding.dto.FundingRes;
import com.luckyseven.funding.service.FundingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/fundings")
public class FundingController {
    private final FundingService fundingService;

    @PostMapping
    @Operation(
            summary = "펀딩 등록",
            description = "<strong>eventId</strong>를 꼭 담아서 보내주세요.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> createFunding(@RequestBody final FundingCreateReq dto){
        try{
            //log.debug(dto.toString());
            final int fundingId = fundingService.createFunding(dto);
            return ResponseEntity.status(HttpStatus.OK).body(fundingId);
        } catch (Exception e){
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

    public ResponseEntity<?> getFundingList(@PathVariable("eventId") final int eventId){
        try{
            //log.debug(String.valueOf(eventId));
            final List<FundingRes> fundingResList = fundingService.findFundings(eventId);
            return ResponseEntity.status(HttpStatus.OK).body(fundingResList);
        } catch (Exception e){
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
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> getFunding(@PathVariable("fundingId") final int fundingId){
        try{
            FundingDetailRes fundingDetailRes = fundingService.getFunding(fundingId);
            return ResponseEntity.status(HttpStatus.OK).body(fundingDetailRes);
        } catch (Exception e){
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
