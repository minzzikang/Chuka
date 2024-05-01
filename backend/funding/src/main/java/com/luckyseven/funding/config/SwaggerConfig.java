package com.luckyseven.funding.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {

        Info info =
                new Info()
                        .title("Funding Server API")
                        .description("Funding RESTful API 명세서 입니다.")
                        .version("1.0.0");
        return new OpenAPI().info(info);
    }

    @Bean
    public GroupedOpenApi customTestOpenAPi() {
        String[] paths = {"/**"};

        return GroupedOpenApi.builder().group("API 1.0.0").pathsToMatch(paths).build();
    }
}
