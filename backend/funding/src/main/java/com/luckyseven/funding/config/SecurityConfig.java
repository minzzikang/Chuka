package com.luckyseven.funding.config;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    @Value("${user-id}")
    private String ID;
    @Value("${user-pwd}")
    private String PWD;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors((cors) -> cors
                        .configurationSource(new CorsConfigurationSource() {
                            @Override
                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                                CorsConfiguration configuration = new CorsConfiguration();
                                configuration.setAllowedOrigins(
                                        List.of(
                                                "http://localhost:5000",
                                                "https://chuka.kr",
                                                "http://ec2-43-203-200-59.ap-northeast-2.compute.amazonaws.com:8081",
                                                "http://ec2-43-203-200-59.ap-northeast-2.compute.amazonaws.com:8082",
                                                "http://k10c107.p.ssafy.io:8083",
                                                "http://k10c107.p.ssafy.io:8084",
                                                "http://k10c107.p.ssafy.io:8085"
                                        )
                                );
                                configuration.setAllowedMethods(Collections.singletonList("*"));
                                configuration.setAllowCredentials(true);
                                configuration.setAllowedHeaders(Collections.singletonList("*"));
                                configuration.setMaxAge(3600L);
                                configuration.setExposedHeaders(Collections.singletonList("Set-Cookie"));
                                configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                                return configuration;

                            }
                        }));
        http
                .csrf((auth) -> auth.disable());

        http
                .formLogin((auth) -> auth.disable());

        http
                .httpBasic(Customizer.withDefaults());

        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/swagger-resources/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/actuator/**").permitAll()
                        .requestMatchers("/actuator/**/**").permitAll()
                        .requestMatchers("/api/v1/fundings/**").permitAll()
                        .requestMatchers( "/swagger-ui/**").hasRole("ADMIN")
                        .anyRequest().authenticated());

        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {

        UserDetails user1 = User.builder()
                .username(ID)
                .password(bCryptPasswordEncoder().encode(PWD))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user1);
    }
}