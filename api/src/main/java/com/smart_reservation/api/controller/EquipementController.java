package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.request.EquipementRequestDto;
import com.smart_reservation.api.dto.request.PeriodeRequestDto;
import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.response.ExemplaireResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.service.EmpruntService;
import com.smart_reservation.api.service.EquipementService;
import com.smart_reservation.api.service.ExemplaireService;
import com.smart_reservation.api.service.LabelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/equipements")
@RequiredArgsConstructor
public class EquipementController {


    private final EquipementService equipementService;
    private final ExemplaireService exemplaireService;
    private final EmpruntService empruntService;
    private final LabelService labelService;


    @GetMapping
    public ResponseEntity<Iterable<EquipementResumeDto>> getEquipements() {
        return ResponseEntity.ok(equipementService.getEquipements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipementResponseDto> getEquipement(@PathVariable Long id) {
        return ResponseEntity.ok(equipementService.getEquipement(id));
    }

    @PostMapping
    public ResponseEntity<EquipementResponseDto> createEquipement(@Valid @RequestBody EquipementRequestDto equipementRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(equipementService.createEquipement(equipementRequestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipementResponseDto>  updateEquipement(@Valid @RequestBody EquipementRequestDto equipementRequestDto, @PathVariable Long id) {
        return ResponseEntity.ok(equipementService.updateEquipement(equipementRequestDto,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipement(@PathVariable Long id) {
        equipementService.deleteEquipement(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{equipementId}/labels/{labelId}/add")
    public ResponseEntity<EquipementResponseDto> addLabel(@PathVariable Long labelId, @PathVariable Long equipementId) {
        return ResponseEntity.ok(labelService.addLabelToEquipement(labelId, equipementId));
    }

    @PatchMapping("/{equipementId}/labels/{labelId}/remove")
    public ResponseEntity<EquipementResponseDto> removeLabel(@PathVariable Long labelId, @PathVariable Long equipementId) {
        return ResponseEntity.ok(labelService.removeLabelFromEquipement(labelId, equipementId));
    }

    @GetMapping("/{id}/exemplaires")
    public ResponseEntity<Iterable<ExemplaireResponseDto>> getExemplairesFromEquipement(@PathVariable Long id) {
        return ResponseEntity.ok(exemplaireService.getExemplairesFromEquipement(id));
    }

    @GetMapping("/{id}/emprunts")
    public ResponseEntity<Iterable<EmpruntResponseDto>> getEmpruntsFromEquipement(@PathVariable Long id, @Valid @RequestBody PeriodeRequestDto periodeDto) {
        return ResponseEntity.ok(empruntService.getEmpruntsByEquipementAndDateDebutAndDateFin(id,periodeDto.debut, periodeDto.fin));
    }

}

