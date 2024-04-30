package com.luckyseven.SCG.filter;

import com.luckyseven.SCG.util.JwtUtil;
import com.luckyseven.SCG.util.redis.RedisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class AuthenticationUserOrNotFilter extends AbstractGatewayFilterFactory<AuthenticationUserOrNotFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private RedisService redisService;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationUserOrNotFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest loggedInUser = null;

            if (validator.isSecured.test(exchange.getRequest())) {
                // header contains token or not
                String authHeader = null;

                if (exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                }

                // header contains token
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);

                    try {
                        jwtUtil.validateToken(authHeader);

                        if (!jwtUtil.getType(authHeader).equals("ATK")) {
                            throw new RuntimeException("different type token");
                        }

                        String values = redisService.getValues(authHeader);
                        if (values != null && values.equals("logout")) {
                            throw new RuntimeException("invalid token");
                        }

                        loggedInUser = exchange.getRequest()
                                .mutate()
                                .header("loggedInUser", jwtUtil.getId(authHeader)).build();

                    } catch (Exception e) {
                        throw new RuntimeException("un authorized access to application");
                    }
                }

            }

            return chain.filter(exchange.mutate().request(loggedInUser).build());
        });
    }

    public static class Config {

    }
}
