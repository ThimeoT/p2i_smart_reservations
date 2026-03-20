package com.smart_reservation.api.exception;

public class EquipementRequisManquantException extends RuntimeException {
    public EquipementRequisManquantException(Long sourceId) {
        super(
                "L'équipement ayant pour id " + sourceId + " ne possède pas ses équipements requis."
        );
    }
}
