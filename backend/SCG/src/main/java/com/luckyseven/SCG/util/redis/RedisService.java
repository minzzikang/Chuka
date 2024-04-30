package com.luckyseven.SCG.util.redis;

import java.time.Duration;

public interface RedisService {

    String getValues(String key);

    boolean hasKey(String key);
}
