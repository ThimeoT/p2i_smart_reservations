package com.smart_reservation.api.model;

public enum StatutReservation {
    EN_ATTENTE("EN_ATTENTE"),
    VALIDEE("VALIDEE"),
    REFUSEE("REFUSEE"),
    SUPPRIMEE("SUPPRIMEE");

    private final String code;

    private StatutReservation(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
