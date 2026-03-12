package com.smart_reservation.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class SessionDtoReduit {

    @NotNull
    public Long id;

    @NotNull
    public LocalDateTime debut;

    @NotNull
    public LocalDateTime fin;
}
