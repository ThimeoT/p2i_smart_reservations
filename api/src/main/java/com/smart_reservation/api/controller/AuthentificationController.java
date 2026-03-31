package com.smart_reservation.api.controller;

import com.smart_reservation.api.model.Utilisateur;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthentificationController {

    @GetMapping("/csrf")
    public ResponseEntity<?> getCsrf() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/current")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
                "mail", authentication.getName(),
                "role", authentication
                        .getAuthorities()
                        .iterator().next()
                        .getAuthority()
                        .replace("ROLE_", "")
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
