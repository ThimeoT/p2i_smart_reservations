package com.smart_reservation.api.configuration;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken(String mail, String role) {
        Instant now = Instant.now();
        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .subject(mail)
                .claim("role", role)
                .issueTime(Date.from(now))
                .expirationTime(Date.from(now.plusMillis(expiration)))
                .build();

        try {
            SignedJWT jwt = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),
                    claims
            );
            jwt.sign(new MACSigner(getKey()));
            return jwt.serialize();
        } catch (Exception e) {
            throw new RuntimeException("Erreur génération JWT", e);
        }
    }

    public JWTClaimsSet extractClaims(String token) {
        try {
            SignedJWT jwt = SignedJWT.parse(token);
            jwt.verify(new MACVerifier(getKey()));
            return jwt.getJWTClaimsSet();
        } catch (Exception e) {
            throw new RuntimeException("Token invalide", e);
        }
    }

    public String extractMail(String token) {
        try {
            return extractClaims(token).getSubject();
        } catch (Exception e) {
            throw new RuntimeException("Token invalide", e);
        }
    }

    public boolean isTokenValid(String token) {
        try {
            Date expiry = extractClaims(token).getExpirationTime();
            return expiry != null && expiry.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}