package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.dto.resume.EquipementResumeDto;

import java.util.List;

public class ListeEquipementsResponseDto {

    public Long id;

    public String nom;

    public String description;

    public UtilisateurResponseDto utilisateur;

    public List<EquipementResumeDto> equipements;
}
