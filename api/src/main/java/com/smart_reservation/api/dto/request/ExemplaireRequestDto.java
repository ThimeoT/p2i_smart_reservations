package com.smart_reservation.api.dto.request;


import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.StatutDisponibilite;
import jakarta.validation.constraints.NotNull;

public class ExemplaireRequestDto {

    @NotNull(message = "un exemplaire doit faire référence à un équipement")
    public Long equipementId;

    @NotNull
    public StatutDisponibilite statutDisponibilite;

    public String nomSerie;

}
