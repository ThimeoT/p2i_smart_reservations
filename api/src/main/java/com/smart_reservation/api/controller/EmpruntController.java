package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.service.EmpruntService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprunts")
public class EmpruntController {

    @Autowired
    private EmpruntService empruntService;

    @GetMapping()

    @PostMapping("/{id}/terminer")
    public ResponseEntity<EmpruntResponseDto> terminerEmprunt(@PathVariable Long id){
        return ResponseEntity.ok(empruntService.terminer(id));
    }

}
