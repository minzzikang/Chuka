package com.luckyseven.event.rollsheet.controller;

import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.common.response.BaseResponseBody;
import com.luckyseven.event.message.ProducerService;
import com.luckyseven.event.rollsheet.dto.CountEventDto;
import com.luckyseven.event.rollsheet.dto.CreateEventDto;
import com.luckyseven.event.rollsheet.dto.EditEventDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import com.luckyseven.event.rollsheet.entity.Event;
import com.luckyseven.event.rollsheet.repository.EventQueryRepository;
import com.luckyseven.event.rollsheet.service.EventService;
import com.luckyseven.event.rollsheet.service.RollSheetService;
import com.luckyseven.event.util.jwt.JWTUtil;
import com.querydsl.core.Tuple;
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
@Tag(name = "Event", description = "이벤트(롤링페이퍼) API")
public class EventController {

    private final JWTUtil jwtUtil;

    private final EventService eventService;
    private final RollSheetService rollSheetService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return eventService.sendDdayalarmTest();
//        return ResponseEntity.ok().body("보냄");
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "이벤트 등록", description = "이벤트를 등록(생성)한다.\n swagger에서 Authorization token 설정 必")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "비어있는 파일"),
            @ApiResponse(responseCode = "413", description = "20MB를 초과하는 파일"),
            @ApiResponse(responseCode = "415", description = "지원하지 않는 확장자"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
            @ApiResponse(responseCode = "503", description = "서버 오류 (File IO)")
    })
    public ResponseEntity<?> createEvent(
            @ModelAttribute CreateEventDto createEventDto,
            @RequestHeader("loggedInUser") String userId,
            @RequestHeader("Authorization") String authorization
    ) {
        EventDto event = null;

        try {
            String nickname = jwtUtil.getNickname(authorization.substring("Bearer ".length()));
            event = eventService.createEvent(createEventDto, userId, nickname);
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
            //500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 IO 중 에러 발생");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body("에러 발생");
        }

        return ResponseEntity.status(200).body(event);
    }

    @GetMapping
    @Operation(summary = "이벤트 목록 조회", description = "이벤트 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity<?> getEvents(
            @Parameter(description = "정렬기준: asc=오래된순 desc=최신순", example = "asc || desc") @RequestParam(required = false, defaultValue = "desc") String order,
            @Parameter(description = "정렬조건: participants=참가자순, createTime=날짜순", example = "participants || createTime") @RequestParam(required = false, defaultValue = "date") String sort,
            @Parameter(description = "페이지 번호(0부터 시작)") @RequestParam int page,
            @Parameter(description = "페이지당 항목 수") @RequestParam int size
    ) {
        log.info("order: {}, sort: {}, page: {}, pageSize: {}", order, sort, page, size);
        try{
            List<EventDto> events = eventService.getPublicEvents(order, sort, page, size);

            return ResponseEntity.status(200).body(events);
        } catch (Exception e) {
            log.error("[ERROR!] 이벤트 조회 오류 발생");
            log.error(e.getMessage());

            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping("/me")
    @Operation(summary = "내 이벤트 조회", description = "내 이벤트 목록을 조회한다. (이벤트 날짜 기준 내림차순")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity<?> getMyEvents(
            @Parameter(description = "upcoming", example = "true") @RequestParam(required = false) boolean upcoming,
            @Parameter(description = "페이지 번호(0부터 시작)") @RequestParam int page,
            @Parameter(description = "페이지당 항목 수") @RequestParam int size,
            @Parameter(description = "participant", example = "true") @RequestParam(required = false) boolean participant,
            @RequestHeader("loggedInUser") String userId
    ) {
        List<EventDto> results;
        if (!participant) {
            results = eventService.getMyEvents(userId, page, size, upcoming);
        } else {
            results = eventService.getEventsUserParticipatedIn(userId, page, size);
        }

        return ResponseEntity.status(200).body(results);
    }

    @GetMapping("/{eventId}")
    @Operation(summary = "이벤트 정보 조회", description = "이벤트 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 이벤트"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity<EventDto> getEvent(@PathVariable("eventId") int eventId) {
        try {
            EventDto event = eventService.getEvent(eventId);

            return ResponseEntity.status(200).body(event);
        } catch (NullPointerException e) {
            log.error("존재하지 않는 이벤트 조회");
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            log.error("[Error]");
            log.error(e.getMessage());
        }

        return ResponseEntity.status(400).body(null);
    }

    @PutMapping(value = "/{eventId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "이벤트 정보 수정", description = "이벤트 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "403", description = "권한 없음"),
            @ApiResponse(responseCode = "413", description = "용량 초과"),
            @ApiResponse(responseCode = "415", description = "확장자 불일치"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<?> editEvent(
            @PathVariable("eventId") int eventId, @ModelAttribute EditEventDto eventDto, @RequestHeader("loggedInUser") String userId
    ) {
        if (!eventService.isMyEvent(eventId, userId)) {
            return ResponseEntity.status(403).body(null);
        }

        EventDto event = null;
        try {
            event = eventService.editEvent(eventDto, eventId, userId);
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
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body("에러 발생");
        }

        return ResponseEntity.status(200).body(event);
    }

    @DeleteMapping("/{eventId}")
    @Operation(summary = "이벤트 삭제", description = "이벤트를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "403", description = "권한 없음"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 이벤트"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity deleteEvent(@PathVariable("eventId") int eventId, @RequestHeader("loggedInUser") String userId) {

        try {
            if (!eventService.isMyEvent(eventId, userId)) {
                return ResponseEntity.status(403).body(BaseResponseBody.of(403, "권한 없음"));
            }
        } catch (NullPointerException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "존재하지 않는 이벤트"));
        }

        try {
            eventService.deleteEvent(eventId);

        } catch (NoSuchElementException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "존재하지 않는 이벤트"));
        } catch (UnsupportedOperationException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "삭제 불가능한 이벤트"));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "에러"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "이벤트 삭제"));

    }

    @GetMapping("/count")
    @Operation(summary = "이벤트, 축하메시지 개수 조회", description = "이벤트를 개수, 축하메시지 개수를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity<?> getCount() {

        try {
            CountEventDto result = new CountEventDto();
            result.setEventCnt(eventService.countEvent());
            result.setMsgCnt(rollSheetService.countRollSheet());

            return ResponseEntity.status(200).body(result);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(null);
        }

    }

}
