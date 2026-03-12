package com.smart_reservation.api.dto;
import com.smart_reservation.api.model.StatutReservation;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ReservationResponseDto {

    @NotNull
    public Long id;

    @NotNull
    public UtilisateurDtoReduit utilisateur;

    @NotNull
    public String titre;

    @NotNull
    public StatutReservation statutReservation;

    @NotNull
    public List<SessionResponseDto> sessions;


    public List<HistoriqueReservationDto> historiqueReservation;
}
