package com.smart_reservation.api.dto.request;

import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class ListeEquipementRequestDto {

    @NotNull
    public String nom;

    @NotNull
    public String description;

    @NotNull
    public List<Long> equipementsId;
}
