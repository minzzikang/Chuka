package com.luckyseven.event.rollsheet.controller;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.dto.CreateRollSheetDto;
import com.luckyseven.event.rollsheet.dto.RollSheetDto;
import com.luckyseven.event.rollsheet.service.RollSheetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/events")
@Tag(name = "RollSheet", description = "이벤트(롤링페이퍼) API")
public class RollSheetController {

    private final RollSheetService rollSheetService;

    @PostMapping(value = "/{eventId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "롤링페이퍼 등록", description = "롤링페이퍼를 등록(생성)한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "403", description = "권한 없음"),
            @ApiResponse(responseCode = "413", description = "용량 초과"),
            @ApiResponse(responseCode = "415", description = "확장자 불일치"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> createRollSheet(
            @PathVariable("eventId") int eventId,
            @ModelAttribute CreateRollSheetDto rollSheetDto,
            @RequestHeader(name = "loggedInUser", required = false) String userId
    ) {

        try {
            RollSheetDto rollSheet = rollSheetService.createRollSheet(rollSheetDto, userId, eventId);

            if (rollSheet == null) {
                return ResponseEntity.status(400).body(null);
            }

            return ResponseEntity.status(200).body(rollSheet);
        } catch (EmptyFileException e) {
            //400
            return ResponseEntity.status(400).body("파일이 비어있습니다.");
        } catch (BigFileException e) {
            //413
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("업로드한 파일의 용량이 20MB 이상입니다.");
        } catch (NotValidExtensionException e) {
            //415
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("지원하는 확장자가 아닙니다. 지원하는 이미지 형식: jpg, png, jpeg, gif, webp");
        } catch (IOException e) {
            //415
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("지원하는 확장자가 아닙니다. 지원하는 이미지 형식: jpg, png, jpeg, gif, webp");
        } catch (NoSuchElementException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body("존재하지 않는 이벤트입니다.");
        } catch (Exception e) {
            log.error("롤링페이퍼 등록: {}", e.getMessage());
        }

        return ResponseEntity.status(400).body(null);
    }

    @GetMapping("/{eventId}/roll-sheets")
    @Operation(summary = "롤링페이퍼 목록 조회", description = "eventId에 해당하는 롤링페이퍼 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "200", description = "실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 이벤트"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> getRollSheets(
            @PathVariable("eventId") int eventId,
            @Parameter(description = "페이지 번호(0부터 시작)") @RequestParam int page,
            @Parameter(description = "페이지당 항목 수") @RequestParam int size
    ) {

        try {
            List<RollSheetDto> results = rollSheetService.getRollSheetListWithEventId(eventId, page, size);

            return ResponseEntity.status(200).body(results);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("존재하지 않는 이벤트입니다.");
        } catch (Exception e) {
            log.error("롤링페이퍼 목록 조회: {}", e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping("/roll-sheets/{rollSheetId}")
    @Operation(summary = "롤링페이퍼 단건 조회", description = "rollSheetId에 해당하는 롤링페이퍼를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "200", description = "실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 이벤트"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> getRollSheet(@PathVariable("rollSheetId") String rollSheetId) {

        try {
            RollSheetDto result = rollSheetService.getRollSheet(rollSheetId);

            return ResponseEntity.status(200).body(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body("존재하지 않는 이벤트입니다.");
        } catch (Exception e) {
            log.error("롤링페이퍼 단건 조회: {}", e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }

}
