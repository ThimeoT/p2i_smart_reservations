package com.smart_reservation.api.dto.response;
import com.smart_reservation.api.model.StatutUtilisateur;
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

    public StatutUtilisateur statutUtilisateur;

    public LocalDate dateExpiration;



}
