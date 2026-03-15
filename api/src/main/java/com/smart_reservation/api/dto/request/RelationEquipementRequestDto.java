package com.smart_reservation.api.dto.request;

import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.StatutRelationEquipement;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class RelationEquipementRequestDto {

    @NotNull
    public StatutRelationEquipement statutRelationEquipement;

    @NotEmpty
    public List<Long> equipementsCibleId;

    @NotNull
    public String commentaire;
}
