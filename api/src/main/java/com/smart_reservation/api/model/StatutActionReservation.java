package com.smart_reservation.api.model;

public enum StatutActionReservation {
    CREATION("CREATION"),
    VALIDATION("VALIDATION"),
    REFUS("REFUS"),
    RECTIFICATION("RECTIFICATION"),
    SUPPRESSION("SUPPRESSION");

    private final String code;

    private StatutActionReservation(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}
