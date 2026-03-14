package com.smart_reservation.api.dto.resume;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class SessionDtoReduit {

    public Long id;

    public LocalDateTime debut;

    public LocalDateTime fin;
}
