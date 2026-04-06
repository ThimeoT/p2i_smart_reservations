package com.smart_reservation.api.model;

public enum StatutUtilisateur {
    INVITE("INVITE"),
    ACTIF("ACTIF"),
    EXPIRE("EXPIRE"),
    DESACTIVE("DESACTIVE"),;
    private final String code;

    private StatutUtilisateur(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    }
