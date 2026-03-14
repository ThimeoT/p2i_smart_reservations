package com.smart_reservation.api.dto.resume;

import jakarta.validation.constraints.NotNull;

public class UtilisateurDtoReduit {

    @NotNull
    public Long id;

    public String nom;

    public String prenom;

}
