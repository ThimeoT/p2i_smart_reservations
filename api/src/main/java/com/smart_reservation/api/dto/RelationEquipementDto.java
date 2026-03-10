package com.smart_reservation.api.dto;

import com.smart_reservation.api.model.StatutRelationEquipement;

public class RelationEquipementDto {
    public Long id;
    public StatutRelationEquipement statutRelationEquipement;
    public EquipementDtoReduit equipementSource;
    public GroupeEquipementDto groupeEquipement;
    public String commentaire;
}
