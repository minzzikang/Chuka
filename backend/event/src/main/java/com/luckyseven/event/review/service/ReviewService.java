package com.luckyseven.event.review.service;

import com.luckyseven.event.review.dto.CreateReviewDto;
import com.luckyseven.event.review.entity.Review;

import java.util.List;

public interface ReviewService {

    Review createReview(CreateReviewDto dto);
    List<Review> getReviews();

}
