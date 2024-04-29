package com.luckyseven.event.rollsheet.controller;

import com.luckyseven.event.rollsheet.dto.CountEventDto;
import com.luckyseven.event.rollsheet.service.MainPageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/events")
@Tag(name = "Event Main", description = "이벤트(롤링페이퍼) API")
public class MainPageController {

    private final MainPageService mainPageService;

    @GetMapping("/count")
    @Operation(summary = "이벤트 개수, 축하메시지 개수", description = "누적된 이벤트와 축하 메시지 개수를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity<CountEventDto> getEvents(
    ) {

        try {
            CountEventDto result = new CountEventDto();
            result.setEventCnt(mainPageService.countEvent());
            result.setMsgCnt(mainPageService.countRollSheet());

            return ResponseEntity.status(200).body(result);
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(400).body(null);
        }
    }

}
