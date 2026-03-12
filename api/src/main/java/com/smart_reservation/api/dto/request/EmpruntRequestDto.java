package com.smart_reservation.api.dto.request;

import com.smart_reservation.api.dto.resume.SessionDtoReduit;
import com.smart_reservation.api.dto.resume.UtilisateurDtoReduit;

import java.time.LocalDateTime;

public class EmpruntRequestDto {

    public Long id;

    public Long exemplaireId;

    public LocalDateTime dateRetourPrevue;

    public LocalDateTime dateRetourReelle;
}
