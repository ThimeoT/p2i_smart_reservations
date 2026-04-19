package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ActionReservationRequestDto {

    @NotNull
    @Positive
    public Long utilisateurId;

    @NotBlank
    public String message;
}
