package com.luckyseven.event.rollsheet.controller;

import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/events")
@Tag(name = "Event", description = "이벤트(롤링페이퍼) API")
public class EventController {

    @PostMapping("/")
    @Operation(summary = "이벤트 등록", description = "이벤트를 등록(생성)한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> createEvent(
            @RequestBody CreateEventDto createEventDto, @RequestHeader("loggedInUser") String userId
            ) {


        return ResponseEntity.status(200).body(null);
    }

}
