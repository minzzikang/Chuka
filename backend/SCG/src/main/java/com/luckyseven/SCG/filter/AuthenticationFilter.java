package com.luckyseven.SCG.filter;

import com.luckyseven.SCG.util.JwtUtil;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;


@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
//            System.out.println("===========================필터 적용=========================");

            ServerHttpRequest loggedInUser=null;
            if (validator.isSecured.test(exchange.getRequest())) {
                //header contains token or not
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }
                try {
                    jwtUtil.validateToken(authHeader);

                    if (!jwtUtil.getType(authHeader).equals("ATK")) {
                        throw new RuntimeException("different type token");
                    }

                    loggedInUser = exchange.getRequest()
                            .mutate()
                            .header("loggedInUser", jwtUtil.getId(authHeader)).build();

                } catch (Exception e) {
//                    System.out.println("invalid access...!");
                    throw new RuntimeException("un authorized access to application");
                }

            }


            assert loggedInUser != null;
            return chain.filter(exchange.mutate().request(loggedInUser).build());
        });
    }

    public static class Config {

    }
}
