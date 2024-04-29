package com.luckyseven.event.review.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "review")
public class Review {

    @Id
    private String reviewId;
    private String content;
    private String phoneNumber;
    private LocalDateTime createTime;

}
