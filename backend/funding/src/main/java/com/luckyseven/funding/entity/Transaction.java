package com.luckyseven.funding.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    private String transactionId;

    @NotNull
    @Column(length = 20, nullable = false)
    private String pgName;
    @NotNull
    @Column(length = 20, nullable = false, unique = true)
    private String pgId;

    @ColumnDefault("'PAID'")
    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    @NotNull
    @Column(nullable = false)
    private Integer amount;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime transactionTime;
}
