package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.dto.EventDto;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.luckyseven.event.rollsheet.entity.QEvent.event;
import static com.luckyseven.event.rollsheet.entity.QJoinEvent.joinEvent;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EventQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    OrderSpecifier<String> eventDateOrderSpecifierDesc = Expressions.stringPath("event.date").desc();
    OrderSpecifier<String> eventDateOrderSpecifierAsc = Expressions.stringPath("event.date").asc();

    /**
     * 내가 생성한 이벤트 조회
     *
     * @param userId   유저 아이디
     * @param page     볼 페이지
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
                .orderBy(eventDateOrderSpecifierDesc)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();

        return result;
    }

    public List<EventDto> getPublicEvents(boolean isAsc, int page, int pageSize) {
        OrderSpecifier<String> orderSpecifier;
        if (isAsc) {
            orderSpecifier = eventDateOrderSpecifierAsc;
        } else {
            orderSpecifier = eventDateOrderSpecifierDesc;
        }

        List<EventDto> results = jpaQueryFactory.select(
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
                .where(event.visibility.eq(true))
                .orderBy(orderSpecifier)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();

        return results;
    }

    public List<EventDto> getEventsUserParticipatedIn(String userId, int page, int pageSize) {
        List<EventDto> results = jpaQueryFactory
                .select(Projections.bean(EventDto.class,
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
                .rightJoin(joinEvent)
                .on(event.eq(joinEvent.joinEventPK.event))
                .where(joinEvent.joinEventPK.userId.eq(userId))
                .orderBy(eventDateOrderSpecifierDesc)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();

        return results;
    }

}
