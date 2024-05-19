package com.luckyseven.user.util.jwt;

import com.luckyseven.user.user.entity.Roles;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JWTUtil {

    private final SecretKey secretKey;

    public JWTUtil(@Value("${secret-key}") String secret) {
        secretKey =
                new SecretKeySpec(
                        secret.getBytes(StandardCharsets.UTF_8),
                        Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public void validateToken(final String token) {
        Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
    }

    /**
     * 토큰에서 카카오 아이디(식별자)를 추출하여 리턴한다.
     *
     * @param token
     * @return
     */
    public String getId(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("id", String.class);
    }

    public String getNickname(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("nickname", String.class);
    }

    public Roles getRole(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role", Roles.class);
    }

    public String getType(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("type", String.class);
    }

    public Boolean isExpired(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }

    public String createAccessToken(String id, String nickname, Roles role) {

        return Jwts.builder()
                .claim("id", id)
                .claim("nickname", nickname)
                .claim("role", role)
                .claim("type", "ATK")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(Date.from(Instant.now().plus(3, ChronoUnit.HOURS)))
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshToken(String id, String nickname, Roles role) {

        return Jwts.builder()
                .claim("id", id)
                .claim("nickname", nickname)
                .claim("role", role)
                .claim("type", "RTK")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(Date.from(Instant.now().plus(15, ChronoUnit.DAYS)))
                .signWith(secretKey)
                .compact();
    }

}
