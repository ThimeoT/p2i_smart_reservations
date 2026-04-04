package com.smart_reservation.api.dto.response;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UtilisateurResponseDto {

    public Long id;

    public String nom;

    public String prenom;

    public String mail;

    public String formation;

    public String role;

    public LocalDate dateExpiration;

}
