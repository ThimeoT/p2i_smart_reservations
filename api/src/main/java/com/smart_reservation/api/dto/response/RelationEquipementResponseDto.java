package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.StatutRelationEquipement;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class RelationEquipementResponseDto {

    @NotNull
    public Long id;

    @NotNull
    public StatutRelationEquipement statutRelationEquipement;

    @NotNull
    public EquipementResumeDto equipementSource;

    @NotNull
    public List<EquipementResumeDto> equipementsCible;

    @NotNull
    public String commentaire;
}
