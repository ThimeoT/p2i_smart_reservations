package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class SessionRequestDto {

    @NotNull
    public Long id;

    @NotNull
    public List<EmpruntRequestDto> emprunts;

    @NotNull
    public LocalDateTime debut;

    @NotNull
    public LocalDateTime fin;
}
