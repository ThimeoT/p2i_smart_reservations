package com.smart_reservation.api.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UtilisateurDto {
    public Long utilisateurId;
    public String nom;
    public String prenom;
    public String mail;
    public String formation;
    public LocalDateTime dateExpiration;
    public ListeEquipementDto panier;
    public List<ListeEquipementDto> listesEnregistrees;
    public List<ReservationDto> reservations;
    public List<EmpruntDto> emprunts;
}
