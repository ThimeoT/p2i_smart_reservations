package com.smart_reservation.api.dto;

import com.smart_reservation.api.model.StatutRelationEquipement;

import java.util.List;

public class RelationEquipementDto {
    public Long id;
    public StatutRelationEquipement statutRelationEquipement;
    public EquipementDtoReduit equipementSource;
    public List<EquipementDtoReduit> equipementsCible;
    public String commentaire;
}
