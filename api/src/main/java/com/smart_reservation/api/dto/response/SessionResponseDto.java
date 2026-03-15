package com.smart_reservation.api.dto.response;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class SessionResponseDto {

    public Long id;

    public List<EmpruntResponseDto> emprunts;

    public LocalDateTime debut;

    public LocalDateTime fin;
}
