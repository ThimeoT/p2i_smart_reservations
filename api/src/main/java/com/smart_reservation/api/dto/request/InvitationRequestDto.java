package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class InvitationRequestDto {
    @Email
    @NotBlank
    public String mail;

    public String role;

}
