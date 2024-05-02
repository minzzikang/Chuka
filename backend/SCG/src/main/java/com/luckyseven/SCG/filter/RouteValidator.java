package com.luckyseven.SCG.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {
    // pass할거
    public static final List<String> openApiEndpoint = List.of(
            "/api/v1/auth/login",
            "/api/v1/auth/reissue",
            "/eureka",
            "/api/v1/notifacations/test"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoint.stream().noneMatch(uri-> request.getURI().getPath().contains(uri));
}
