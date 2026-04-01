package com.smart_reservation.api.exception;

public class RessourceIntrouvableException extends RuntimeException {
    public RessourceIntrouvableException(String categorie, Long id) {
        super(categorie + " avec l'id " + id + " introuvable");
    }
    public RessourceIntrouvableException(String categorie, String ressource, String valeur) {
        super(categorie + " avec la ressource '"+ ressource + "' : "  + valeur + " introuvable");
    }
}
