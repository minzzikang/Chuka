package com.luckyseven.user.user.repository;

import com.luckyseven.user.user.entity.FcmToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Integer> {

}
