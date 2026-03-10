package com.smart_reservation.api.model;

public enum StatutDisponibilite {
    DISPONIBLE("DISPONIBLE"),
    INDISPONIBLE("INDISPONIBLE"),
    MAINTENANCE("MAINTENANCE"),
    HORS_SERVICE("HORS_SERVICE");

    private final String code;

    private StatutDisponibilite(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }


}
