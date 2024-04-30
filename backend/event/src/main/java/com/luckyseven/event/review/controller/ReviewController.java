package com.luckyseven.event.review.controller;

import com.luckyseven.event.review.dto.CreateReviewDto;
import com.luckyseven.event.review.entity.Review;
import com.luckyseven.event.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
@Tag(name = "Review", description = "리뷰 API")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/test")
    public ResponseEntity<String> test(
    ) {
        return ResponseEntity.status(200).body("review Controller");
    }

    @GetMapping
    @Operation(summary = "리뷰 조회", description = "리뷰를 최신순으로 3개 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity<List<Review>> getEvents(
    ) {
        List<Review> reviews = reviewService.getReviews();

        return ResponseEntity.status(200).body(reviews);
    }

    @PostMapping
    @Operation(summary = "리뷰 작성", description = "리뷰를 작성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류"),
    })
    public ResponseEntity<Review> postEvent(
            @RequestBody CreateReviewDto dto
    ) {
        Review review = reviewService.createReview(dto);

        return ResponseEntity.status(200).body(review);
    }

}
