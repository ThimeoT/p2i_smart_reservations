package com.smart_reservation.api.exception;

public class EmpruntTermineAvantDebutSessionException extends RuntimeException {
  public EmpruntTermineAvantDebutSessionException(String message) {
    super(message);
  }
}
