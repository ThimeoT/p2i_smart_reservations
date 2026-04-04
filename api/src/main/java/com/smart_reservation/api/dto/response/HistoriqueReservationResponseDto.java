package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.model.StatutActionReservation;

import java.time.LocalDateTime;

public class HistoriqueReservationResponseDto {

    public Long id;

    public StatutActionReservation action;

    public UtilisateurResponseDto utilisateur;

    public LocalDateTime date;

    public String commentaire;

}
