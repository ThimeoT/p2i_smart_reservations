package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DateExpirationRequestDto {

    @NotNull
    @Future
    public LocalDate dateExpiration;

}
