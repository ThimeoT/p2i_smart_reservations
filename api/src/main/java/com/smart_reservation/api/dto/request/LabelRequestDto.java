package com.smart_reservation.api.dto.request;


import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class LabelRequestDto {

    @NotNull
    public String nom;

    @NotNull
    public String description;

    @NotNull
    public String color;

}
