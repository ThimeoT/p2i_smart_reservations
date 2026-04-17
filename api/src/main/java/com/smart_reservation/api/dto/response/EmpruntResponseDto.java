package com.smart_reservation.api.dto.response;

import com.smart_reservation.api.dto.resume.SessionResumeDto;
import com.smart_reservation.api.model.StatutEmprunt;

import java.time.LocalDateTime;

public class EmpruntResponseDto {

    public Long id;

    public StatutEmprunt statut;

    public SessionResumeDto session;

    public ExemplaireResponseDto exemplaire;

    public LocalDateTime dateRetourPrevue;

    public LocalDateTime dateRetourReelle;
}
