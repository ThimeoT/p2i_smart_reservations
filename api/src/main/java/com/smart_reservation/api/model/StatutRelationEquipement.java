package com.smart_reservation.api.model;

public enum StatutRelationEquipement {
    COMPATIBLE("COMPATIBLE"),
    RECOMMANDE("RECOMMANDE"),
    REQUIS("REQUIS");

    private final String code;

    private StatutRelationEquipement(String code) {
        this.code = code;
    }

    public String getCode()
    {
        return code;
    }
}