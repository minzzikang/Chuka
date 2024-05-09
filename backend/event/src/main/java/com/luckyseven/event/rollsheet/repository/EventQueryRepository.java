package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.dto.DdayReceiveDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import com.luckyseven.event.rollsheet.entity.Event;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.luckyseven.event.rollsheet.entity.QEvent.event;
import static com.luckyseven.event.rollsheet.entity.QJoinEvent.joinEvent;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EventQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    final OrderSpecifier<String> createTimeOrderSpecifierDesc = Expressions.stringPath("event.createTime").desc();
    final OrderSpecifier<String> createTimeOrderSpecifierAsc = Expressions.stringPath("event.createTime").asc();
    final OrderSpecifier<String> eventDateOrderSpecifierDesc = Expressions.stringPath("event.date").desc();
    final OrderSpecifier<String> eventDateOrderSpecifierAsc = Expressions.stringPath("event.date").asc();

    /**
     * 내가 생성한 이벤트 조회
     *
     * @param userId   유저 아이디
     * @param page     볼 페이지
     * @param pageSize 페이지당 항목 수
     * @return 생성한 이벤트 목록
     */
    public List<EventDto> getMyEvents(String userId, int page, int pageSize, boolean upcoming) {
        JPAQuery<EventDto> query = jpaQueryFactory.select(
                        Projections.bean(EventDto.class,
                                event.eventId,
                                event.userId,
                                event.nickname,
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

    public List<EventDto> getPublicEventsByCreateTime(boolean isAsc, int page, int pageSize) {
        OrderSpecifier<String> orderSpecifier;
        if (isAsc) {
            orderSpecifier = createTimeOrderSpecifierAsc;
        } else {
            orderSpecifier = createTimeOrderSpecifierDesc;
        }

        List<EventDto> results = jpaQueryFactory.select(
                        Projections.bean(EventDto.class,
                                event.eventId,
                                event.userId,
                                event.nickname,
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

    public List<EventDto> getPublicEventsByCreateTime(String order, int page, int pageSize) {
        OrderSpecifier<String> orderSpecifier;
        if (order.equals("asc")) {
            orderSpecifier = createTimeOrderSpecifierAsc;
        } else {
            orderSpecifier = createTimeOrderSpecifierDesc;
        }

        List<EventDto> results = jpaQueryFactory.select(
                        Projections.bean(EventDto.class,
                                event.eventId,
                                event.userId,
                                event.nickname,
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

    public List<EventDto> getPublicEventsByRollingPaperCounts(String sort, int page, int pageSize) {
        OrderSpecifier<Integer> asc = event.rollingPaperCnt.asc();
        OrderSpecifier<Integer> desc = event.rollingPaperCnt.desc();

        OrderSpecifier<Integer> order;
        if (sort.equals("asc")) {
            order = asc;
        } else {
            order = desc;
        }

        return jpaQueryFactory
                .select(
                        Projections.bean(
                                EventDto.class,
                                event.eventId,
                                event.userId,
                                event.nickname,
                                event.pageUri,
                                event.type,
                                event.title,
                                event.date,
                                event.banner,
                                event.bannerThumbnail,
                                event.theme,
                                event.visibility,
                                event.createTime
                        )
                )
                .from(event)
                .where(event.visibility.eq(true))
                .orderBy(order)
                .orderBy(createTimeOrderSpecifierDesc)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();
    }

    public List<EventDto> getPublicEventsByParticipants(String sort, int page, int pageSize) {

        OrderSpecifier<Long> asc = joinEvent.joinEventPK.event.eventId.count().asc();
        OrderSpecifier<Long> desc = joinEvent.joinEventPK.event.eventId.count().desc();

        OrderSpecifier<Long> order;
        if (sort.equals("asc")) {
            order = asc;
        } else {
            order = desc;
        }

        return jpaQueryFactory
                .select(
                        Projections.bean(
                                EventDto.class,
                                event.eventId,
                                event.userId,
                                event.nickname,
                                event.pageUri,
                                event.type,
                                event.title,
                                event.date,
                                event.banner,
                                event.bannerThumbnail,
                                event.theme,
                                event.visibility,
                                event.createTime
                        )
                )
                .from(event)
                .leftJoin(joinEvent)
                .on(event.eventId.eq(joinEvent.joinEventPK.event.eventId))
                .where(event.visibility.eq(true))
                .groupBy(event.eventId)
                .orderBy(order)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();

    }

    public List<EventDto> getPublicEventsOrderByDate(boolean isAsc, int page, int pageSize) {
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
                                event.nickname,
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
                        event.nickname,
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

    public List<DdayReceiveDto> findAllByCurdate() {
        System.out.println("d?????????????????");
        LocalDate currentDate = LocalDate.now();
        System.out.println("currentDate ==> " + currentDate);


        List<Event> eventIdList = jpaQueryFactory
                .select(Projections.bean(Event.class,
                        event.eventId,
                        event.userId))
                .from(event)
                .where(event.date.eq(currentDate))
                .fetch();
//    log.info("======data =============> {}",data);
        List<DdayReceiveDto> result = new ArrayList<>();

        for (Event curEvent : eventIdList) {
            DdayReceiveDto ddayReceiveDto = new DdayReceiveDto();
            Integer curEventId = curEvent.getEventId();
            ddayReceiveDto.setCreater(curEvent.getUserId());
            ddayReceiveDto.setEventId(curEventId);


            // 이벤트에 참여한 사람불러오기

            List<String> joinMembers = jpaQueryFactory
                    .select(joinEvent.joinEventPK.userId)
                    .from(joinEvent).leftJoin(event).on(joinEvent.joinEventPK.event.eq(event))
                    .where(event.eventId.eq(curEventId))
                    .fetch();
            ddayReceiveDto.setJoinMembers(joinMembers);
            result.add(ddayReceiveDto);
        }
//        for (DdayReceiveDto ddayReceiveDto : result) {
//            log.info("ddayReceiveDto.toString() => {}", ddayReceiveDto.toString());
//        }
        return result;
    }
}
