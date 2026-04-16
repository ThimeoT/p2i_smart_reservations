package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.Emprunt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;

@Repository
public interface EmpruntRepository extends CrudRepository<Emprunt,Long> {
    Iterable<Emprunt> findAllBySession_Id(Long sessionId);
    Iterable<Emprunt> findAllByExemplaire_Id(Long exemplaireId);
    Iterable<Emprunt> findAllBySession_DebutAfterAndSession_FinBefore(LocalDateTime debut, LocalDateTime fin);
    Iterable<Emprunt> findAllByExemplaire_Equipement_IdAndSession_DebutLessThanAndSession_FinGreaterThan(Long equipementId, LocalDateTime debut, LocalDateTime fin);
    Iterable<Emprunt> findAllByExemplaire_IdAndSession_DebutLessThanAndSession_FinGreaterThan(Long exemplaireId, LocalDateTime debut, LocalDateTime fin);
}
