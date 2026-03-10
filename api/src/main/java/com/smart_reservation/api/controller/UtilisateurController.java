package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.UtilisateurDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.service.UtilisateurService;

import java.util.Optional;


@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public Iterable<UtilisateurDto> getUtilisateurs() {
        return utilisateurService.getUtilisateurs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDto> getUtilisateur(@PathVariable Long id) {
        return ResponseEntity.ok(utilisateurService.getUtilisateur(id));
    }

    @PostMapping
    public ResponseEntity<UtilisateurDto> saveUtilisateur(@RequestBody Utilisateur utilisateur) {
        return ResponseEntity.ok(utilisateurService.saveUtilisateur(utilisateur)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}
