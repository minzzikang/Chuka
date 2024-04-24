package com.luckyseven.user.util.redis;

import java.time.Duration;

public interface RedisService {
    boolean save(String id, String token, Duration duration);
    boolean saveRefreshToken(String id, String token);
    boolean saveLogoutToken(String accessToken);

    String getValues(String key);

    boolean delete(String key);

    boolean hasKey(String key);
}
