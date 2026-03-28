package com.smart_reservation.api.dto.response;

import java.util.List;

public class EquipementResponseDto {

    public Long id;

    public String nom;

    public String description;

    public String urlImage;

    public List<LabelResponseDto> labels;

    public List<ExemplaireResponseDto> exemplaires;

    public List<String> liensRessources;

    public List<RelationEquipementResponseDto> relationsEquipement;
}
