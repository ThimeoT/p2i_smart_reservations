package com.smart_reservation.api.dto;

import java.time.LocalDateTime;

public class EmpruntDto {
    public Long id;
    public UtilisateurDtoReduit utilisateur;
    public SessionDtoReduit session;
    public ExemplaireDto exemplaire;
    public LocalDateTime dateRetourPrevue;
    public LocalDateTime dateRetourReelle;
}
