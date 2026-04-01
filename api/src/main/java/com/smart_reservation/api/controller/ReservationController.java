package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.request.ReservationRequestDto;
import com.smart_reservation.api.dto.response.ReservationResponseDto;
import com.smart_reservation.api.dto.resume.ReservationResumeDto;
import com.smart_reservation.api.service.ReservationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
@AllArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<Iterable<ReservationResumeDto>> getReservations(){
        return ResponseEntity.ok(reservationService.getReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponseDto> getReservation(@PathVariable Long id){
        return ResponseEntity.ok(reservationService.getReservation(id));
    }

    @PostMapping
    public ResponseEntity<ReservationResponseDto> saveReservation(@Valid  @RequestBody ReservationRequestDto reservationRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.createReservation(reservationRequestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationResponseDto> updateReservation(@PathVariable Long id, @RequestBody ReservationRequestDto reservationRequestDto ){
        return ResponseEntity.ok(reservationService.updateReservation(id, reservationRequestDto));
    }

    @PatchMapping("/{id}/valider")
    public ResponseEntity<ReservationResponseDto> validerReservation(@PathVariable Long id, @Valid @RequestBody Long utilisateurId,@Valid @RequestBody String message){
        return ResponseEntity.ok(reservationService.validerReservation(id, utilisateurId, message));
    }

    @PatchMapping("/{id}/refuser")
    public ResponseEntity<ReservationResponseDto> refuserReservation(@PathVariable Long id,@RequestBody Long utilisateurId, @RequestBody String message){
        return ResponseEntity.ok(reservationService.refuserReservation(id, utilisateurId, message));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id){
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
