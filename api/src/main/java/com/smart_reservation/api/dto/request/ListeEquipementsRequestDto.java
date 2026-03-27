package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

public class ListeEquipementsRequestDto {

    public Long id;

    @NotBlank
    public String nom;

    @NotNull
    public String description;

    @NotNull
    public List<Long> equipementsId;
}
