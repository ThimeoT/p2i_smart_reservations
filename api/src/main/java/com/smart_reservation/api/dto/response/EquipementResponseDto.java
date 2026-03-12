package com.smart_reservation.api.dto;

import java.util.List;

public class EquipementResponseDto {

    public Long id;

    public String nom;

    public String description;

    public String urlImage;

    public List<LabelDto> labels;

    public List<ExemplaireResponseDto> exemplaires;

    public List<String> lienRessources;

    public List<RelationEquipementResponseDto> relationsEquipement;

}
