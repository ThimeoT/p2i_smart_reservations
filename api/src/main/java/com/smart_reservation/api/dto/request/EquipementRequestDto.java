package com.smart_reservation.api.dto.request;

import java.util.List;

public class EquipementRequestDto {

    public Long id;

    public String nom;

    public String description;

    public String urlImage;

    public List<LabelRequestDto> labels;

    public List<ExemplaireRequestDto> exemplaires;

    public List<String> lienRessources;

    public List<RelationEquipementRequestDto> relationsEquipement;

}
