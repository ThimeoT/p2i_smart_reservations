package com.smart_reservation.api.dto;

import java.time.LocalDateTime;

public class EmpruntResponseDto {

    public Long id;

    public UtilisateurDtoReduit utilisateur;

    public SessionDtoReduit session;

    public ExemplaireResponseDto exemplaire;

    public LocalDateTime dateRetourPrevue;

    public LocalDateTime dateRetourReelle;
}
