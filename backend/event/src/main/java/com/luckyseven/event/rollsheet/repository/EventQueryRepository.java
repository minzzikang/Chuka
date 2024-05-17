package com.luckyseven.event.rollsheet.repository;

import com.luckyseven.event.rollsheet.dto.DdayReceiveDto;
import com.luckyseven.event.rollsheet.dto.EventDto;
import com.luckyseven.event.rollsheet.dto.RollingpaperCreatAlarmDto;
import com.luckyseven.event.rollsheet.entity.Event;
import com.luckyseven.event.rollsheet.entity.JoinEvent;
import com.querydsl.core.types.Expression;
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
import java.util.NoSuchElementException;

import static com.luckyseven.event.rollsheet.entity.QEvent.event;
import static com.luckyseven.event.rollsheet.entity.QJoinEvent.joinEvent;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EventQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    private final OrderSpecifier<String> createTimeOrderSpecifierDesc = Expressions.stringPath("event.createTime").desc();
    private final OrderSpecifier<String> createTimeOrderSpecifierAsc = Expressions.stringPath("event.createTime").asc();
    private final OrderSpecifier<String> eventDateOrderSpecifierDesc = Expressions.stringPath("event.date").desc();
    private final OrderSpecifier<String> eventDateOrderSpecifierAsc = Expressions.stringPath("event.date").asc();

    private final Expression<EventDto> eventProjection = Projections.bean(
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
    );

    private List<EventDto> executePagination(JPAQuery<EventDto> query, int page, int pageSize) {
        return query
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();
    }

    /**
     * 내가 생성한 이벤트 조회
     *
     * @param userId   유저 아이디
     * @param page     볼 페이지
     * @param pageSize 페이지당 항목 수
     * @return 생성한 이벤트 목록
     */
    public List<EventDto> getMyEvents(String userId, int page, int pageSize, boolean upcoming, String word) {
        JPAQuery<EventDto> query = jpaQueryFactory.select(eventProjection)
                .from(event)
                .where(event.userId.eq(userId));

        if (!word.isBlank()) {
            query = query.where(event.title.contains(word));
        }

        if (upcoming) {
            query = query.where(event.date.goe(LocalDate.now())); // 예정된 이벤트만 선택
        }

        query = query.orderBy(eventDateOrderSpecifierDesc);

        return executePagination(query, page, pageSize);
    }

    public List<EventDto> getPublicEventsByCreateTime(boolean isAsc, int page, int pageSize) {
        OrderSpecifier<String> orderSpecifier = isAsc ? createTimeOrderSpecifierAsc : createTimeOrderSpecifierDesc;

        List<EventDto> results = jpaQueryFactory.select(eventProjection)
                .from(event)
                .where(event.visibility.eq(true))
                .orderBy(orderSpecifier)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();

        return results;
    }

    public List<EventDto> getPublicEventsByCreateTime(String order, int page, int pageSize) {
        OrderSpecifier<String> orderSpecifier = order.equals("asc") ? createTimeOrderSpecifierAsc : createTimeOrderSpecifierDesc;

        List<EventDto> results = jpaQueryFactory.select(eventProjection)
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

        OrderSpecifier<Integer> order = sort.equals("asc") ? asc : desc;

        return jpaQueryFactory.select(eventProjection)
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

        OrderSpecifier<Long> order = sort.equals("asc") ? asc : desc;

        return jpaQueryFactory.select(eventProjection)
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
        OrderSpecifier<String> orderSpecifier = isAsc ? eventDateOrderSpecifierAsc : eventDateOrderSpecifierDesc;

        List<EventDto> results = jpaQueryFactory.select(eventProjection)
                .from(event)
                .where(event.visibility.eq(true))
                .orderBy(orderSpecifier)
                .offset(pageSize * page)
                .limit(pageSize)
                .fetch();

        return results;
    }

    public List<EventDto> getEventsUserParticipatedIn(String userId, int page, int pageSize, String word) {
        JPAQuery<EventDto> query = jpaQueryFactory.select(eventProjection)
                .from(event)
                .rightJoin(joinEvent)
                .on(event.eq(joinEvent.joinEventPK.event))
                .where(joinEvent.joinEventPK.userId.eq(userId));

        if (!word.isBlank()) {
            query = query.where(event.title.contains(word));
        }

        query = query.orderBy(eventDateOrderSpecifierDesc);

        return executePagination(query, page, pageSize);
    }

    public int getParticipantEventSearchCount(String userId, String word) {
        List<JoinEvent> results = jpaQueryFactory
                .select(joinEvent)
                .from(joinEvent)
                .innerJoin(event)
                .on(joinEvent.joinEventPK.event.eq(event))
                .where(
                        joinEvent.joinEventPK.userId.eq(userId)
                                .and(event.title.contains(word))
                )
                .fetch();

        return results.isEmpty() ? 0 : results.size();
    }

    public List<DdayReceiveDto> findAllByCurdate() {
        LocalDate currentDate = LocalDate.now();

        List<Event> eventIdList = jpaQueryFactory
                .select(Projections.bean(Event.class,
                        event.eventId,
                        event.title,
                        event.userId,
                        event.pageUri))
                .from(event)
                .where(event.date.eq(currentDate))
                .fetch();

        List<DdayReceiveDto> result = new ArrayList<>();

        for (Event curEvent : eventIdList) {
            DdayReceiveDto ddayReceiveDto = new DdayReceiveDto();
            Integer curEventId = curEvent.getEventId();
            ddayReceiveDto.setCreater(curEvent.getUserId());
            ddayReceiveDto.setEventId(curEventId);
            ddayReceiveDto.setPageUri(curEvent.getPageUri());
            ddayReceiveDto.setTitle(curEvent.getTitle());

            // 이벤트에 참여한 사람불러오기
            List<String> joinMembers = jpaQueryFactory
                    .select(joinEvent.joinEventPK.userId)
                    .from(joinEvent).leftJoin(event).on(joinEvent.joinEventPK.event.eq(event))
                    .where(event.eventId.eq(curEventId))
                    .fetch();
            ddayReceiveDto.setJoinMembers(joinMembers);
            result.add(ddayReceiveDto);
        }

        return result;
    }

    public List<DdayReceiveDto> findAllByCurdateTest() {
        LocalDate currentDate = LocalDate.now();

        List<Event> eventIdList = jpaQueryFactory
                .select(Projections.bean(Event.class,
                        event.eventId,
                        event.title,
                        event.userId,
                        event.pageUri))
                .from(event)
                .where(event.eventId.eq(20))
                .fetch();

        List<DdayReceiveDto> result = new ArrayList<>();

        for (Event curEvent : eventIdList) {
            DdayReceiveDto ddayReceiveDto = new DdayReceiveDto();
            Integer curEventId = curEvent.getEventId();
            ddayReceiveDto.setCreater(curEvent.getUserId());
            ddayReceiveDto.setEventId(curEventId);
            ddayReceiveDto.setPageUri(curEvent.getPageUri());
            ddayReceiveDto.setTitle(curEvent.getTitle());

            // 이벤트에 참여한 사람불러오기
            List<String> joinMembers = jpaQueryFactory
                    .select(joinEvent.joinEventPK.userId)
                    .from(joinEvent).leftJoin(event).on(joinEvent.joinEventPK.event.eq(event))
                    .where(event.eventId.eq(curEventId))
                    .fetch();
            ddayReceiveDto.setJoinMembers(joinMembers);
            result.add(ddayReceiveDto);
        }

        return result;
    }

    public RollingpaperCreatAlarmDto findByEventId(int eventId) {

        Event result = jpaQueryFactory.select(Projections.bean(Event.class,
                        event.pageUri,
                        event.title,
                        event.userId))
                .from(event).where(event.eventId.eq(eventId)).fetchOne();

        if(result == null){
            throw new NoSuchElementException("삭제된 이벤트입니다.");
        }

        return RollingpaperCreatAlarmDto.builder()
                .eventId(eventId)
                .eventTitle(result.getTitle())
                .userId(result.getUserId())
                .pageUri(result.getPageUri()).build();
    }
}
