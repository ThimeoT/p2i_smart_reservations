package com.smart_reservation.api.exception;

public class RessourceDejaUtiliseeException extends RuntimeException {
    public RessourceDejaUtiliseeException(String categorie, String valeur) {
        super(categorie + " avec la valeur '" + valeur + "' est déjà utilisé.e");
    }
}
