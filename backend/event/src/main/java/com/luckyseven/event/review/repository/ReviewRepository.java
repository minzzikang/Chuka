package com.luckyseven.event.review.repository;

import com.luckyseven.event.review.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository  extends MongoRepository<Review, String> {
}
