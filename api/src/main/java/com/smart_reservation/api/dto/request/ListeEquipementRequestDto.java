package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.dto.resume.EquipementDtoReduit;
import com.smart_reservation.api.dto.resume.UtilisateurDtoReduit;

import java.util.List;

public class ListeEquipementResponseDto {

    public Long id;

    public String nom;

    public String description;

    public UtilisateurDtoReduit utilisateur;

    public List<EquipementDtoReduit> equipements;
}
