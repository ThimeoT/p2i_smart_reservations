package com.smart_reservation.api.model;

public enum StatutEmprunt {
    PLANIFIE("PLANIFIE"),
    EN_COURS("EN_COURS"),
    TERMINE("TERMINE"),
    ANNULE("ANNULE");

    private final String code;

    private StatutEmprunt(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}