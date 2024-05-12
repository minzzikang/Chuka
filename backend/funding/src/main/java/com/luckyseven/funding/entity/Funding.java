package com.luckyseven.funding.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Setter
@Builder
@ToString
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class Funding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fundingId;

    @NotNull
    @Column
    private int eventId;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String productLink;

    @Column(length = 50)
    private String introduce;

    @NotNull
    @Column
    private int goalAmount;

    @Column(length = 50)
    private String option;

    @NotNull
    @Column(length = 15)
    private String receiverName;

    @NotNull
    @Column(length = 30)
    private String receiverPhone;

    @NotNull
    @Column(length = 10)
    private String postalCode;

    @NotNull
    @Column(length = 50)
    private String address;

    @NotNull
    @Column(length = 50)
    private String addressDetail;

    @ColumnDefault("'PENDING'")
    @Enumerated(EnumType.STRING)
    private FundingStatus status;

    @Column
    private String productImage;

    @Column(length = 50)
    private String productName;

    @Column
    private Integer productPrice;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createTime;

    @NotNull
    @Column
    private String userId;

    @ColumnDefault("'ONGOING'")
    @Enumerated(EnumType.STRING)
    private FundingResult result;

    @Builder.Default
    @OneToMany(mappedBy = "funding")
    @OrderBy("amount desc")
    private List<Sponsor> sponsorList = new ArrayList<>();


    public void successCrawling(FundingStatus status, String productImage, String productName, Integer productPrice) {
        this.status = status;
        this.productImage = productImage;
        this.productName = productName;
        this.productPrice = productPrice;
    }

    public void failCrawling(FundingStatus status) {
        this.status = status;
    }
    public void successFunding(FundingResult result) {this.result = result;}
}
