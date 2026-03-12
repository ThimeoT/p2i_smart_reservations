package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UtilisateurRequestDto {

    @NotNull
    public Long id;

    @NotNull
    public String nom;

    @NotNull
    public String prenom;

    @NotNull
    public String mail;


    public String formation;

    public LocalDateTime dateExpiration;

    public ListeEquipementRequestDto panier;

    public List<ListeEquipementRequestDto> listesEnregistrees;

    public List<ReservationRequestDto> reservations;

    public List<EmpruntRequestDto> emprunts;
}
