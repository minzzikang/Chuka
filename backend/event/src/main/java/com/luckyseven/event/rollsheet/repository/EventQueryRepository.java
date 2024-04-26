package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.dto.EventDto;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.luckyseven.event.rollsheet.entity.QEvent.event;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EventQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    OrderSpecifier<String> eventDateOrderSpecifier = Expressions.stringPath("event.date").desc();

    /**
     * 내가 생성한 이벤트 조회
     * @param userId 유저 아이디
     * @param page 볼 페이지
     * @param pageSize 페이지당 항목 수
     * @return
     */
    public List<EventDto> getMyEvents(String userId, int page, int pageSize, boolean upcoming) {
        JPAQuery<EventDto> query = jpaQueryFactory.select(
                        Projections.bean(EventDto.class,
                                event.eventId,
                                event.userId,
                                event.pageUri,
                                event.type,
                                event.title,
                                event.date,
                                event.banner,
                                event.bannerThumbnail,
                                event.theme,
                                event.visibility,
                                event.createTime))
                .from(event)
                .where(event.userId.eq(userId));

        if (upcoming) {
            query = query.where(event.date.after(LocalDate.now())); // 예정된 이벤트만 선택
        }

        List<EventDto> result = query
                .orderBy(eventDateOrderSpecifier)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();

        return result;
    }
}
