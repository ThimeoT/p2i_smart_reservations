package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.ListeEquipementDto;
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
    public ResponseEntity<UtilisateurDto> createUtilisateur(@RequestBody Utilisateur utilisateurDto) {
        return ResponseEntity.ok(utilisateurService.saveUtilisateur(utilisateurDto));
    }

    @PutMapping
    public ResponseEntity<UtilisateurDto> updateUtilisateur(@PathVariable UtilisateurDto utilisateurDto) {
        return ResponseEntity.ok(utilisateurService.updateUtilisateur(utilisateurDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }

    // LISTE EQUIPEMENT

    @GetMapping("/{idUtilisateur}/listeEquipement")
    public Iterable<ListeEquipementDto> getListesEquipement() {
        return utilisateurService.getListesEquipements(@PathVariable Long idUtilisateur);
    }

    @GetMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<ListeEquipementDto> getListeEquipement(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idListeEquipement) {
        return ResponseEntity.ok(utilisateurService.getListeEquipement(idUtilisateur, idListeEquipement));
    }

    @PostMapping("/{idUtilisateur}/listeEquipement")
    public ResponseEntity<ListeEquipementDto> createListeEquipement(
            @PathVariable Long idUtilisateur,
            @RequestBody ListeEquipementDto listeEquipementDto) {
        return ResponseEntity.ok(utilisateurService.saveListeEquipement(idUtilisateur,listeEquipementDto));
    }

    @PutMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<ListeEquipementDto> updateListeEquipement(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idListeEquipement,
            @RequestBody UtilisateurDto listeEquipementDto) {
        return ResponseEntity.ok(utilisateurService.updateListeEquipement(idUtilisateur,idListeEquipement,listeEquipementDto));
    }

    @DeleteMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<Void> deleteListeEquipement(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idListe) {
        utilisateurService.deleteListeEquipement();
        return ResponseEntity.noContent().build();
    }

}
