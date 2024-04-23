package com.luckyseven.user.util.redis;

public interface RedisService {
    boolean save(String id, String token);

    String getValues(String key);

    boolean delete(String key);

    boolean hasKey(String key);
}
