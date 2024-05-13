package com.luckyseven.SCG.filter;

import com.luckyseven.SCG.util.JwtUtil;
import com.luckyseven.SCG.util.redis.RedisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;


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

            try {
                if (validator.isSecured.test(exchange.getRequest())) {
                    // header contains token or not
                    String authHeader = null;

                    if (exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                        authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                    }

                    log.info("AuthenticationUserOrNotFilter--> header: {}", exchange.getRequest().getHeaders());

                    // header contains token
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        authHeader = authHeader.substring(7);

                        try {
                            jwtUtil.validateToken(authHeader);

                        } catch (Exception e) {
                            throw new RuntimeException("un authorized access to application");
                        }

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

                    }

                }
            } catch (RuntimeException e) {
                // status code
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.UNAUTHORIZED);

                // Set custom error message in the response body
                String errorMessage = "Authentication failed: " + e.getMessage();
                response.getHeaders().add(HttpHeaders.CONTENT_TYPE, "text/plain");
                return response.writeWith(Mono.just(response.bufferFactory().wrap(errorMessage.getBytes())));
            }

            return chain.filter(exchange.mutate().request(loggedInUser).build());
        });
    }

    public static class Config {

    }
}
