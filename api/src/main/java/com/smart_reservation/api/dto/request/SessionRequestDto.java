package com.smart_reservation.api.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.smart_reservation.api.dto.EquipementQuantiteDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class SessionRequestDto {

    public Long id;

    @NotEmpty(message = "une session doit comporter au moins un équipement à réserver")
    public List<EquipementQuantiteDto> equipementQuantiteDtos;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public LocalDateTime debut;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public LocalDateTime fin;
}
