package com.luckyseven.user.auth.controller;

import com.luckyseven.user.auth.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/auth/login")
    public ResponseEntity<?> login(@RequestParam String code, HttpServletResponse response) throws IOException {
//        String redirect_uri="http://www.google.com";
//        response.sendRedirect(redirect_uri);

        String token = authService.getToken(code);
        authService.getUserInfo(token);

        return ResponseEntity.status(200).body(null);
    }

    @GetMapping("/auth/logout")
    public ResponseEntity<?> logout() throws IOException {

        log.info("logout!!");

        return ResponseEntity.status(200).body(null);
    }
}

