package com.smart_reservation.api.dto.request;
import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;
import com.smart_reservation.api.model.StatutReservation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ReservationRequestDto {

    public Long id;

    @NotNull
    public Long utilisateurId;

    @NotBlank
    public String titre;

    @NotNull
    public String description;

    @NotNull
    public StatutReservation statut;

    @NotNull
    public List<SessionRequestDto> sessions;
}
