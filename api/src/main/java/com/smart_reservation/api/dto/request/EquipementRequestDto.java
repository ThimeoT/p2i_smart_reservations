package com.smart_reservation.api.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.URL;

import java.util.List;

public class EquipementRequestDto {

    @NotNull
    public String nom;

    @NotNull
    public String description;

    @NotNull
    @URL(message = "le lien renseigné pour l'image est invalide")
    public String urlImage;

    public List<Long> labelsId;

    @NotNull
    public List<@URL(message="un des liens des ressources est invalide") String> liensRessources;

    @Valid
    public List<RelationEquipementRequestDto> relationsEquipement;

}
