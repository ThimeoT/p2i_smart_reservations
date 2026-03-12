package com.smart_reservation.api.dto;

import com.smart_reservation.api.model.StatutRelationEquipement;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class RelationEquipementResponseDto {

    @NotNull
    public Long id;

    @NotNull
    public StatutRelationEquipement statutRelationEquipement;

    @NotNull
    public EquipementDtoReduit equipementSource;

    @NotNull
    public List<EquipementDtoReduit> equipementsCible;

    @NotNull
    public String commentaire;
}
