package com.sba.exam.sba.untils;

import com.sba.exam.sba.entity.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenHelper {
    @Value("${jwt.secretkey}")
    private String key;

    public String generateToken(Users users) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        String token = Jwts.builder()
                .setIssuer("ATDStore")
                .setSubject("JWT Token")
                .claim("role", users.getRole())
                .claim("name", users.getUserName())
                .claim("address", users.getUserAddress())
                .claim("id", users.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date().getTime()) + 28800000))
                .signWith(secretKey).compact();
        return token;
    }

    public boolean verifyToken(String token) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
