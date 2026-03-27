package com.smart_reservation.api.exception;

public class QuantiteExemplaireIndisponibleException extends RuntimeException {
    public QuantiteExemplaireIndisponibleException(String nomEquipement, int quantiteRequise, int quantiteReelle) {
        super("EXEMPLAIRES INSUFFISANTS pour l'équipement "+nomEquipement+". Quantité requise : "+quantiteRequise+"; Quantité réelle : "+ quantiteReelle+"." );
    }
}
