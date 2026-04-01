package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.model.Utilisateur;

import com.smart_reservation.api.service.UtilisateurService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthentificationController {

    private final UtilisateurService utilisateurService;

    @GetMapping("/csrf")
    public ResponseEntity<?> getCsrf(HttpServletRequest request) {
        CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        token.getToken(); // 👈 ce simple appel déclenche l'écriture du cookie
        return ResponseEntity.ok().build();

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
