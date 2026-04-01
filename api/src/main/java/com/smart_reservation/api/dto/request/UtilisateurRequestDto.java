package com.smart_reservation.api.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UtilisateurRequestDto {

    @PositiveOrZero
    public Long id;

    @NotBlank(message = "Un utilisateur ne peut pas avoir de nom vide !")
    public String nom;

    @NotBlank( message = "Un utilisateur ne peut pas avoir de prénom vide !")
    public String prenom;

    @Email
    public String mail;

    @NotBlank
    public String formation;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public LocalDateTime dateExpiration;

}
