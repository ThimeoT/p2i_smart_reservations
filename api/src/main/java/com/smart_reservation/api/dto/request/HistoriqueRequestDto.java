package com.smart_reservation.api.dto.request;

import com.smart_reservation.api.dto.resume.UtilisateurDtoReduit;
import com.smart_reservation.api.model.StatutActionReservation;

import java.time.LocalDateTime;

public class HistoriqueRequestDto {

    public Long id;

    public StatutActionReservation action;

    public UtilisateurDtoReduit utilisateur;

    public LocalDateTime date;

    public String commentaire;

}
