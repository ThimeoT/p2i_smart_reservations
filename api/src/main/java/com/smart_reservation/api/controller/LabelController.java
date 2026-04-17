package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.mapper.LabelMapper;
import com.smart_reservation.api.dto.request.LabelRequestDto;
import com.smart_reservation.api.dto.response.LabelResponseDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.repository.LabelRepository;
import com.smart_reservation.api.service.LabelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.helpers.LegacyAbstractLogger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/labels")
public class LabelController {
    private final LabelService labelService;
    private final LabelMapper labelMapper;

    @GetMapping
    public Iterable<LabelResponseDto> getLabels() {
        return labelService.getLabels();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabelResponseDto> getLabel(@PathVariable Long id) {
        return ResponseEntity.ok(labelService.getLabel(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabelResponseDto> updateLabel(@Valid @RequestBody LabelRequestDto labelRequestDto) {
        return ResponseEntity.ok(labelService.updateLabel(labelRequestDto));
    }

    @PostMapping
    public ResponseEntity<LabelResponseDto> createLabel(@Valid @RequestBody LabelRequestDto labelRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(labelService.createLabel(labelRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabel(@PathVariable Long id) {
        labelService.deleteLabelById(id);
        return ResponseEntity.noContent().build();
    }
}
