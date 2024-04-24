package com.luckyseven.event.rollsheet.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class Event {

    @Id
    private int eventId;

    @Column(nullable = false)
    private String userId;

    @Column(length = 20, nullable = false)
    private String pageUri;

    @Column(nullable = false)
    private EventType type;

    @Column(length = 15, nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDate date;

    private String banner;

    private String bannerThumbnail;

    @Column(nullable = false)
    private Theme theme;

    @Column(nullable = false)
    private Boolean visibility;

    @Column(nullable = false)
    private LocalDateTime createTime;

}
