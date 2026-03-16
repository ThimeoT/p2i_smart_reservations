package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.request.ListeEquipementsRequestDto;
import com.smart_reservation.api.dto.request.UtilisateurRequestDto;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smart_reservation.api.service.UtilisateurService;


@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public Iterable<UtilisateurResumeDto> getUtilisateurs() {
        return utilisateurService.getUtilisateurs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurResponseDto> getUtilisateur(
            @PathVariable Long id) {
        return ResponseEntity.ok(utilisateurService.getUtilisateur(id));
    }

    @PostMapping
    public ResponseEntity<UtilisateurResponseDto> createUtilisateur(
            @Valid @RequestBody UtilisateurRequestDto utilisateurDto) {
        return ResponseEntity.ok(utilisateurService.saveUtilisateur(utilisateurDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurResponseDto> updateUtilisateur(
            @PathVariable Long id,
            @Valid @RequestBody UtilisateurRequestDto utilisateurRequestDto) {
        return ResponseEntity.ok(utilisateurService.updateUtilisateur(id,utilisateurRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/{idUtilisateur}/listeEquipement")
    public Iterable<ListeEquipementsResponseDto> getListesEquipement(@PathVariable Long idUtilisateur) {
        return utilisateurService.getListesEquipements(idUtilisateur);
    }

    @GetMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<ListeEquipementsResponseDto> getListeEquipements(
            @PathVariable Long idListeEquipement)
    {
        return ResponseEntity.ok(utilisateurService.getListeEquipements(idListeEquipement));
    }

    @PostMapping("/{idUtilisateur}/listeEquipement")
    public ResponseEntity<ListeEquipementsResponseDto> createListeEquipement(
            @PathVariable Long idUtilisateur,
            @Valid @RequestBody ListeEquipementsRequestDto listeEquipementDto) {
        return ResponseEntity.ok(utilisateurService.createListeEquipements(idUtilisateur, listeEquipementDto));
    }

    @PutMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<ListeEquipementsResponseDto> updateListeEquipement(
            @PathVariable Long idListeEquipement,
            @Valid @RequestBody ListeEquipementsRequestDto listeEquipementsDto) {
        return ResponseEntity.ok(utilisateurService.updateListeEquipements(idListeEquipement,listeEquipementsDto));
    }

    @DeleteMapping("/{idUtilisateur}/listeEquipement/{idListe}")
    public ResponseEntity<Void> deleteListeEquipement(
            @PathVariable Long idListe) {
        utilisateurService.deleteListeEquipements(idListe);
        return ResponseEntity.noContent().build();
    }

}
