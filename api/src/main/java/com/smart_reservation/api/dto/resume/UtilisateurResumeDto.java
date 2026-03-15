package com.smart_reservation.api.dto.resume;

import jakarta.validation.constraints.NotNull;

public class UtilisateurResumeDto {

    @NotNull
    public Long id;

    public String nom;

    public String prenom;

}
