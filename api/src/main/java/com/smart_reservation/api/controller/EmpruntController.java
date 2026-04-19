package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.service.EmpruntService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@RequestMapping("/emprunts")
public class EmpruntController {

    private final EmpruntService empruntService;

    @GetMapping("/{id}")
    public ResponseEntity<EmpruntResponseDto> getEmprunt(@PathVariable Long id)
    {
        return ResponseEntity.ok(empruntService.getEmprunt(id));
    }



    @GetMapping("/equipement/{equipementId}")
    public ResponseEntity<Iterable<EmpruntResponseDto>> getEmpruntsByEquipement(
            @PathVariable Long equipementId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        return ResponseEntity.ok(empruntService.getEmpruntsByEquipementAndDateDebutAndDateFin(equipementId, debut, fin));
    }


    @PatchMapping("/{id}/terminer")
    public ResponseEntity<EmpruntResponseDto> terminerEmprunt(@PathVariable Long id){
        return ResponseEntity.ok(empruntService.terminer(id));
    }

    @PatchMapping("/{id}/annuler")
    public ResponseEntity<EmpruntResponseDto> annulerEmprunt(@PathVariable Long id){
        return ResponseEntity.ok(empruntService.annuler(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id){
        empruntService.deleteEmprunt(id);
        return ResponseEntity.noContent().build();
    }

}
