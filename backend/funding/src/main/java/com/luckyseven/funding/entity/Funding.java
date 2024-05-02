package com.luckyseven.funding.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@ToString
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
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
    private FundingStatus status;

    @Column
    private String productImage;

    @Column
    private String productName;

    @Column
    private Integer productPrice;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createTime;

    @Builder.Default
    @OneToMany(mappedBy = "funding")
    @OrderBy("amount desc")
    private List<Sponsor> sponsorList = new ArrayList<>();

    @Column
    private String userId;
}
