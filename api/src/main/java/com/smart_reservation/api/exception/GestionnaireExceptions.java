package com.smart_reservation.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GestionnaireExceptions {

    @ExceptionHandler(RessourceIntrouvableException.class)
    public ResponseEntity<String> handleRessourceIntrouvable(RessourceIntrouvableException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }

    @ExceptionHandler(EmpruntTermineAvantDebutSessionException.class)
    public ResponseEntity<String> handleEmpruntRetourAvantDebutSession(
            EmpruntTermineAvantDebutSessionException exception
    ) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(exception.getMessage());
    }

    @ExceptionHandler(EquipementRequisManquantException.class)
    public ResponseEntity<String> handleEquipementRequisManquant(EquipementRequisManquantException exception) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(exception.getMessage());
    }

    @ExceptionHandler(RessourceDejaUtiliseeException.class)
    public ResponseEntity<String> hangleRessourceDejaUtilisee(RessourceDejaUtiliseeException exception)
    {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(exception.getMessage());
    }

    @ExceptionHandler(QuantiteExemplaireIndisponibleException.class)
    public ResponseEntity<String> handleQuantiteExemplaireIndisponible(QuantiteExemplaireIndisponibleException exception) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(exception.getMessage());
    }
}
