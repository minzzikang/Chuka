package com.luckyseven.funding.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class Sponsor implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sponsorId;

    @Column
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funding_id")
    private Funding funding;

    @NotNull
    @Column
    private Integer amount;

    @Column(length = 50)
    private String comment;

    @NotNull
    @Column(length = 15)
    private String nickname;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime joinTime;
}
