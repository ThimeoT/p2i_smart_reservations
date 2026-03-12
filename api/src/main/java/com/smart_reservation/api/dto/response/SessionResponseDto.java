package com.smart_reservation.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class SessionResponseDto {

    @NotNull
    public Long id;

    @NotNull
    public List<EmpruntResponseDto> emprunts;

    @NotNull
    public LocalDateTime debut;

    @NotNull
    public LocalDateTime fin;
}
