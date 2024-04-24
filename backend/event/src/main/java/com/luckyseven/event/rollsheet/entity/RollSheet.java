package com.luckyseven.event.rollsheet.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class RollSheet {

    @Id
    private int rollSheetId;

    @Column(nullable = false)
    private Event event;

    private String userId;

    @Column(nullable = false)
    private Shape shape;

    @Column(length = 10)
    private String backgroundColor;

    private String content;

    private Font font;

    private String fontColor;

    private String backgroundImage;

    @Column(length = 15, nullable = false)
    private String nickname;

    @Column(nullable = false)
    private LocalDateTime createTime;


}
