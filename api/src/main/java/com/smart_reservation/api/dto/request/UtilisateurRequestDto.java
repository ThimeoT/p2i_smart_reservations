package com.smart_reservation.api.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UtilisateurRequestDto {

    @NotNull
    public Long id;

    @NotNull
    public String nom;

    @NotNull
    public String prenom;

    @NotNull
    public String mail;


    public String formation;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public LocalDateTime dateExpiration;
}
