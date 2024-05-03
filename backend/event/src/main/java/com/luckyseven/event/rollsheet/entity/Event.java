package com.luckyseven.event.rollsheet.entity;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@DynamicUpdate
@Table(indexes = @Index(name = "event_uri_idx", columnList = "page_uri", unique = true))
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String nickname;

    @Column(length = 26, nullable = false)
    private String pageUri;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType type;

    @Column(length = 15, nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDate date;

    private String banner;

    private String bannerThumbnail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Theme theme;

    @Column(nullable = false)
    private Boolean visibility;

    @Column(nullable = false)
    private LocalDateTime createTime;

}
