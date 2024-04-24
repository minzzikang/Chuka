package com.luckyseven.event.rollsheet.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class RollSheet {

    @Id
    private int rollSheetId;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Event event;

    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Shape shape;

    @Column(length = 10)
    private String backgroundColor;

    private String content;

    @Enumerated(EnumType.STRING)
    private Font font;

    private String fontColor;

    private String backgroundImage;

    @Column(length = 15, nullable = false)
    private String nickname;

    @Column(nullable = false)
    private LocalDateTime createTime;


}
