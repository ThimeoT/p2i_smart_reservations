package com.smart_reservation.api.dto.request;

import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;
import com.smart_reservation.api.model.StatutActionReservation;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class HistoriqueReservationRequestDto {

    @NotNull
    public StatutActionReservation action;

    @NotNull
    public Long utilisateurId;

    public String commentaire;

}
