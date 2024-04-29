package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository  extends MongoRepository<Review, String> {
}
