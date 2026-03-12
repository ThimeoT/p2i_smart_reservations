package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.response.ListeEquipementResponseDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.service.UtilisateurService;


@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public Iterable<UtilisateurResponseDto> getUtilisateurs() {
        return utilisateurService.getUtilisateurs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurResponseDto> getUtilisateur(
            @PathVariable Long id) {
        return ResponseEntity.ok(utilisateurService.getUtilisateur(id));
    }

    @PostMapping
    public ResponseEntity<UtilisateurResponseDto> createUtilisateur(
            @RequestBody Utilisateur utilisateurDto) {
        return ResponseEntity.ok(utilisateurService.saveUtilisateur(utilisateurDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurResponseDto> updateUtilisateur(
            @PathVariable Long id,
            @RequestBody UtilisateurResponseDto utilisateurResponseDto) {
        return ResponseEntity.ok(utilisateurService.updateUtilisateur(utilisateurResponseDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }

    // LISTE EQUIPEMENT

    @GetMapping("/{idUtilisateur}/listeEquipement")
    public Iterable<ListeEquipementResponseDto> getListesEquipement(@PathVariable Long idUtilisateur) {
        return utilisateurService.getListesEquipements(idUtilisateur);
    }

    @GetMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<ListeEquipementResponseDto> getListeEquipement(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idListeEquipement)
    {
        return ResponseEntity.ok(utilisateurService.getListeEquipement(idUtilisateur, idListeEquipement));
    }

    @PostMapping("/{idUtilisateur}/listeEquipement")
    public ResponseEntity<ListeEquipementResponseDto> createListeEquipement(
            @PathVariable Long idUtilisateur,
            @RequestBody ListeEquipementResponseDto listeEquipementResponseDto) {
        return ResponseEntity.ok(utilisateurService.saveListeEquipement(idUtilisateur, listeEquipementResponseDto));
    }

    @PutMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<ListeEquipementResponseDto> updateListeEquipement(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idListeEquipement,
            @RequestBody UtilisateurResponseDto listeEquipementDto) {
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
