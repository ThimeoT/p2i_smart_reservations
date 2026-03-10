package com.smart_reservation.api.dto;

import java.util.List;

public class EquipementDto {
    public String nom;
    public String description;
    public String urlImage;
    public List<LabelDto> labels;
    public List<ExemplaireDto> exemplaires;
    public List<String> lienRessources;
    public List<RelationEquipementDto> relationsEquipement;

}
