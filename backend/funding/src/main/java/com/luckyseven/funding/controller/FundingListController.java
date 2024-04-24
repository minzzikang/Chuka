package com.luckyseven.funding.controller;

import com.luckyseven.funding.dto.FundingCreateReq;
import com.luckyseven.funding.entity.Funding;
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
@RequestMapping("/api/v1/events/{eventId}/fundings")
public class FundingListController {
    private final FundingService fundingService;

    @GetMapping
    @Operation(
            summary = "이벤트에 해당하는 펀딩 목록",
            description = "<strong>eventId</strong>를 통해 관련 펀딩 목록을 볼 수 있다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })

    public ResponseEntity<?> getFundingList(@PathVariable("eventId") int eventId){
        try{
            //log.debug(String.valueOf(eventId));
            List<Funding> tmp = fundingService.findFundings(eventId);
            return ResponseEntity.status(HttpStatus.OK).body(eventId);
        } catch (Exception e){
            log.info("[ERROR] : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
