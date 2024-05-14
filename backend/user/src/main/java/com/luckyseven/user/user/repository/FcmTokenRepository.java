package com.luckyseven.user.user.repository;

import com.luckyseven.user.user.entity.FcmToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Integer> {

    void deleteByFcmToken(String fcmtoken);
}
