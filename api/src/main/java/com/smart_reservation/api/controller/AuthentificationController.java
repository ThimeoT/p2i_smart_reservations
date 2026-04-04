package com.smart_reservation.api.controller;

import com.smart_reservation.api.configuration.JwtService;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;

import com.smart_reservation.api.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class AuthentificationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UtilisateurService utilisateurService;

    record LoginRequest(String mail, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.mail(), request.password())
            );

            String role = Objects.requireNonNull(auth.getAuthorities()
                            .iterator().next()
                            .getAuthority())
                    .replace("ROLE_", "");

            UtilisateurResponseDto utilisateur = utilisateurService.getUtilisateurByMail(request.mail());

            String token = jwtService.generateToken(request.mail(), role,utilisateur.id);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "mail", request.mail(),
                    "role", role,
                    "id", utilisateur.id
                    ));

        } catch (BadCredentialsException exception) {
            return ResponseEntity.status(401).build();
        }
    }
    @GetMapping("/user/current")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        UtilisateurResponseDto utilisateur = utilisateurService.getUtilisateurByMail(authentication.getName());
        return ResponseEntity.ok(Map.of(
                "id", utilisateur.id,
                "mail", utilisateur.mail,
                "role", utilisateur.role
        ));
    }

        @GetMapping("/user")
        public String getUser(){
            return "Welcome User ! ";
        }

        @GetMapping("/admin")
        public String getAdmin(){
            return "Welcome Admin ! ";
        }
}


