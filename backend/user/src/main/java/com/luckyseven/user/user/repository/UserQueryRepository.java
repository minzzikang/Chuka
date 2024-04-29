package com.luckyseven.user.user.repository;

import com.luckyseven.user.user.entity.QFcmToken;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;


@Slf4j
@Repository
@RequiredArgsConstructor
public class UserQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QFcmToken fcmToken = QFcmToken.fcmToken1;

    public List<String> getFcmTokenWithUserId(String userId) {
        List<String> result = jpaQueryFactory
                .select(fcmToken.fcmToken)
                .from(fcmToken)
                .where(fcmToken.user.userId.eq(userId))
                .fetch();

        log.info("userId:{}, fcmToken:{}", userId, result);
        return result;
    }

}
