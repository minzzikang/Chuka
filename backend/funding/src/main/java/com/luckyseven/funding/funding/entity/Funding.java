package com.luckyseven.funding.funding.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@DynamicInsert
public class Funding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fundingId;

    @Column
    private int eventId;

    @Column
    private String productLink;

    @Column
    private String introduce;

    @Column
    private int goalAmount;

    @Column
    private String option;

    @Column
    private String receiverName;

    @Column
    private String receiverPhone;

    @Column
    private String postalCode;

    @Column
    private String address;

    @Column
    private String addressDetail;

    @ColumnDefault("'BEFORE'")
    @Enumerated(EnumType.STRING)
    private fundingStatus status;

    @Column
    private String productImage;

    @Column
    private String productName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createTime;

}
