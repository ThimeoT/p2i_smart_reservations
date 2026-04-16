package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.request.ExemplaireRequestDto;
import com.smart_reservation.api.dto.request.PeriodeRequestDto;
import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.dto.response.ExemplaireResponseDto;
import com.smart_reservation.api.service.EmpruntService;
import com.smart_reservation.api.service.ExemplaireService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/exemplaires")
public class ExemplaireController {

    private final ExemplaireService exemplaireService;
    private final EmpruntService empruntService;

    @GetMapping
    public ResponseEntity<Iterable<ExemplaireResponseDto>> getExemplaires()
    {
        return ResponseEntity.ok(exemplaireService.getExemplaires());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExemplaireResponseDto> getExemplaire(@PathVariable Long id)
    {
        return  ResponseEntity.ok(exemplaireService.getExemplaire(id));
    }

    @GetMapping("/{id}/emprunts")ResponseEntity<Iterable<EmpruntResponseDto>> getEmpruntsByPeriode(@PathVariable Long exemplaireId,
       @RequestBody PeriodeRequestDto periodeDto){
        return ResponseEntity.ok(empruntService.getEmpruntsByExemplaireAndDateDebutAndDateFin(exemplaireId,periodeDto.debut,periodeDto.fin));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExemplaireResponseDto> updateExemplaire(@PathVariable Long id, @RequestBody ExemplaireRequestDto exemplaireDto)
    {
        return ResponseEntity.ok(exemplaireService.updateExemplaire(id, exemplaireDto));
    }

    @PostMapping
    public ResponseEntity<ExemplaireResponseDto> createExemplaire(@RequestBody ExemplaireRequestDto exemplaireDto)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(exemplaireService.createExemplaire(exemplaireDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExemplaire(@PathVariable Long id)
    {
        exemplaireService.deleteExemplaire(id);
        return  ResponseEntity.noContent().build();
    }
}
