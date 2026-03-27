package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.StatutRelationEquipement;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class RelationEquipementResponseDto {


    public Long id;

    public StatutRelationEquipement statutRelationEquipement;

    public Long equipementSourceId;

    public List<Long> equipementsCibleIds;

    public String commentaire;
}
