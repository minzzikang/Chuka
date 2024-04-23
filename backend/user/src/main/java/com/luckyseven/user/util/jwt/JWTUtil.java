package com.luckyseven.user.util.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {

    private SecretKey secretKey;

    public JWTUtil(@Value("${secret-key}") String secret) {
        secretKey =
                new SecretKeySpec(
                        secret.getBytes(StandardCharsets.UTF_8),
                        Jwts.SIG.HS256.key().build().getAlgorithm());
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

    /**
     * default : String -> Enum<Roles>으로 변경함.
     *
     * @param token
     * @return
     */
    public String getRole(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role", String.class);
    }

    public Boolean isExpired(String token) {
//        System.out.println("token ====> " + token);
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }

    public String createAccessToken(String nickname, String id, Date date) {

        return Jwts.builder()
                .claim("nickname", nickname)
                .claim("id", id)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(date)
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshToken(String nickname, String id, Date date) {

        return Jwts.builder()
                .claim("nickname", nickname)
                .claim("id", id)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(date)
                .signWith(secretKey)
                .compact();
    }
}
