package com.smart_reservation.api.dto;

import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.dto.response.ListeEquipementResponseDto;
import com.smart_reservation.api.dto.response.ReservationResponseDto;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UtilisateurDto {

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

    public ListeEquipementResponseDto panier;

    public List<ListeEquipementResponseDto> listesEnregistrees;

    public List<ReservationResponseDto> reservations;

    public List<EmpruntResponseDto> emprunts;
}
