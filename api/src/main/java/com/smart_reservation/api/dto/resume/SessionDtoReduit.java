package com.smart_reservation.api.dto.resume;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class SessionDtoReduit {

    @NotNull
    public Long id;

    @NotNull
    public LocalDateTime debut;

    @NotNull
    public LocalDateTime fin;
}
