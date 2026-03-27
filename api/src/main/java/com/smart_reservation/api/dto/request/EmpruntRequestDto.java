package com.smart_reservation.api.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class EmpruntRequestDto {

    public Long id;

    public Long sessionId;

    public Long utilisateurId;

    public Long exemplaireId;

    @Future(message="la date de retour doit être fixée dans le futur")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public LocalDateTime dateRetourPrevue;
}
