package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class InitialisationRequestDto {
    @NotBlank
    @Size(min = 8)
    public String nouveauMotDePasse;

    @NotBlank
    public String nom;

    @NotBlank
    public String prenom;

    public String formation;

}

