package com.luckyseven.event.rollsheet.controller;

import com.luckyseven.event.rollsheet.dto.CreateRollSheetDto;
import com.luckyseven.event.rollsheet.entity.RollSheet;
import com.luckyseven.event.rollsheet.service.RollSheetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/events")
@Tag(name = "RollSheet", description = "이벤트(롤링페이퍼) API")
public class RollSheetController {

    private final RollSheetService rollSheetService;

    @PostMapping("/{eventId}")
    @Operation(summary = "롤링페이퍼 등록", description = "롤링페이퍼를 등록(생성)한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 이벤트"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> createRollSheet(
            @PathVariable("eventId") int eventId,
            @RequestBody CreateRollSheetDto rollSheetDto,
            @RequestHeader(name = "loggedInUser", required = false) String userId
    ) {

        try {
            RollSheet rollSheet = rollSheetService.createRollSheet(rollSheetDto, userId, eventId);

            if (rollSheet == null) {
                return ResponseEntity.status(400).body(null);
            }

            return ResponseEntity.status(200).body(rollSheet);
        } catch (NoSuchElementException e) {
            log.error("존재하지 않는 이벤트");
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(400).body(null);
    }

    @GetMapping("/events/{eventId}/roll-sheets")
    @Operation(summary = "롤링페이퍼 목록 조회", description = "eventId에 해당하는 롤링페이퍼 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "200", description = "실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 이벤트"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> getRollSheets(@PathVariable("eventId") int eventId) {

        try {
            List<RollSheet> results = rollSheetService.getRollSheetListWithEventId(eventId);

            return ResponseEntity.status(200).body(results);
        } catch (NoSuchElementException e) {
            log.error("존재하지 않는 이벤트");
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }
}
