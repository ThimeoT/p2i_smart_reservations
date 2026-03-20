package com.smart_reservation.api.exception;

public class EquipementRequisManquantException extends RuntimeException {
    public EquipementRequisManquantException(Long sourceId,Long cibleId) {
        super(
                "L'équipement ayant pour id " + sourceId + " ne possède pas l'équipement requis "+ cibleId  + "."
        );
    }
}
