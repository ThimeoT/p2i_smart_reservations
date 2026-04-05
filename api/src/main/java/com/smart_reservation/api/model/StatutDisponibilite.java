package com.smart_reservation.api.model;

public enum StatutDisponibilite {
    DISPONIBLE("DISPONIBLE"),
    EMPRUNTE("EMPRUNTE"),
    MAINTENANCE("MAINTENANCE"),
    HORS_SERVICE("HORS_SERVICE");

    private final String code;

    StatutDisponibilite(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
