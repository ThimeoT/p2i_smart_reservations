package com.smart_reservation.api.exception;

import java.time.LocalDateTime;

public class EmpruntTermineAvantDebutSessionException extends RuntimeException {
    public EmpruntTermineAvantDebutSessionException(Long id, LocalDateTime dateDebut) {
        super("Vous ne pouvez pas retourner un équipement avant le début de session (rappel début session : "+ dateDebut.toString());
    }
}
