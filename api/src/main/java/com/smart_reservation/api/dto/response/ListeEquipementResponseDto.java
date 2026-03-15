package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;

import java.util.List;

public class ListeEquipementResponseDto {

    public Long id;

    public String nom;

    public String description;

    public UtilisateurResumeDto utilisateur;

    public List<EquipementResumeDto> equipements;
}
