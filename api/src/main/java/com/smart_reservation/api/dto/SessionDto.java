package com.smart_reservation.api.dto;

import java.time.LocalDateTime;
import java.util.List;

public class SessionDto {
    public Long id;
    public List<EmpruntDto> emprunts;
    public LocalDateTime debut;
    public LocalDateTime fin;
}
