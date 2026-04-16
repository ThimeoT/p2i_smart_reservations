package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

public class ActionReservationRequestDto {

    @NotEmpty
    @Positive
    public Long utilisateurId;

    @NotBlank
    public String message;
}
