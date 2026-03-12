package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.dto.resume.SessionDtoReduit;
import com.smart_reservation.api.dto.resume.UtilisateurDtoReduit;

import java.time.LocalDateTime;

public class EmpruntResponseDto {

    public Long id;

    public UtilisateurDtoReduit utilisateur;

    public SessionDtoReduit session;

    public ExemplaireResponseDto exemplaire;

    public LocalDateTime dateRetourPrevue;

    public LocalDateTime dateRetourReelle;
}
