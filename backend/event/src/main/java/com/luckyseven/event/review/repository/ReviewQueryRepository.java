package com.luckyseven.event.review.repository;

import com.luckyseven.event.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewQueryRepository {

        private final MongoOperations mongoOperations;

        public List<Review> findByReview() {
            Query query = new Query();
            query.with(Sort.by(Sort.Direction.DESC, "createTime")).limit(3);

            return mongoOperations.find(query, Review.class);
        }

}
