package com.smart_reservation.api.dto.resume;

import jakarta.validation.constraints.NotNull;

public class UtilisateurDtoReduit {

    @NotNull
    public Long id;

    @NotNull
    public String nom;

    @NotNull
    public String prenom;

    @NotNull
    public String mail;
}
