package com.smart_reservation.api.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UtilisateurResponseDto {

    public Long id;

    public String nom;

    public String prenom;

    public String mail;

    public String formation;

    public LocalDateTime dateExpiration;
}
