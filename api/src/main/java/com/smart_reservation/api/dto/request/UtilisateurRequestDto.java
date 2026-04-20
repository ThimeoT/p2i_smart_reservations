package com.smart_reservation.api.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UtilisateurRequestDto {

    @PositiveOrZero
    public Long id;

    @NotBlank(message = "Un utilisateur ne peut pas avoir de nom vide !")
    public String nom;

    @NotBlank(message = "Un utilisateur ne peut pas avoir de prénom vide !")
    public String prenom;

    @Email
    public String mail;

    @NotBlank
    public String formation;

}
