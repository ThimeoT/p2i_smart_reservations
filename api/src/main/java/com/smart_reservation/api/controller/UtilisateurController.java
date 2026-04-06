package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.request.InvitationRequestDto;
import com.smart_reservation.api.dto.request.ListeEquipementsRequestDto;
import com.smart_reservation.api.dto.request.UtilisateurRequestDto;
import com.smart_reservation.api.dto.response.InvitationResponseDto;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smart_reservation.api.service.UtilisateurService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

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
            @Valid @RequestBody UtilisateurRequestDto utilisateurDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(utilisateurService.saveUtilisateur(utilisateurDto));
    }

    @PostMapping("/invitation")
    public ResponseEntity<InvitationResponseDto> inviteUtilisateur(
            @Valid @RequestBody InvitationRequestDto dto
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(utilisateurService.inviteUtilisateur(dto));
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
    public ResponseEntity<Iterable<ListeEquipementsResponseDto>> getListesEquipement(@PathVariable Long idUtilisateur) {
        return ResponseEntity.ok(utilisateurService.getListesEquipements(idUtilisateur));
    }

    @GetMapping("/{idUtilisateur}/listeEquipement/{idListeEquipement}")
    public ResponseEntity<ListeEquipementsResponseDto> getListeEquipements(
            @PathVariable Long idListeEquipement,
            @PathVariable Long idUtilisateur)
    {
        return ResponseEntity.ok(utilisateurService.getListeEquipements(idListeEquipement,idUtilisateur));
    }

    @PostMapping("/{idUtilisateur}/listeEquipement")
    public ResponseEntity<ListeEquipementsResponseDto> createListeEquipement(
            @PathVariable Long idUtilisateur,
            @Valid @RequestBody ListeEquipementsRequestDto listeEquipementDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(utilisateurService.createListeEquipements(idUtilisateur, listeEquipementDto));
    }

    @PutMapping("/{idUtilisateur}/listeEquipement/{idListeEquipement}")
    public ResponseEntity<ListeEquipementsResponseDto> updateListeEquipement(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idListeEquipement,
            @Valid @RequestBody ListeEquipementsRequestDto listeEquipementsDto) {
        return ResponseEntity.ok(utilisateurService.updateListeEquipements(idUtilisateur, idListeEquipement,listeEquipementsDto));
    }

    @DeleteMapping("/{idUtilisateur}/listeEquipement/{idListeEquipement}")
    public ResponseEntity<Void> deleteListeEquipement(
            @PathVariable Long idListeEquipement) {
        utilisateurService.deleteListeEquipements(idListeEquipement);
        return ResponseEntity.noContent().build();
    }

}
