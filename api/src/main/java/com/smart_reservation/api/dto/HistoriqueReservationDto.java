package com.smart_reservation.api.dto;

import com.smart_reservation.api.model.StatutActionReservation;

import java.time.LocalDateTime;

public class HistoriqueReservationDto {
    public Long id;
    public StatutActionReservation action;
    public UtilisateurDtoReduit utilisateur;
    public LocalDateTime date;
    public String commentaire;

}
