package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.Emprunt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;

@Repository
public interface EmpruntRepository extends CrudRepository<Emprunt,Long> {
    public Iterable<Emprunt> findAllBySession_Id(Long sessionId);
    public Iterable<Emprunt> findAllByExemplaire_Id(Long exemplaireId);
    public Iterable<Emprunt> findAllBySession_DebutAfterAndSession_FinBefore(LocalDateTime debut, LocalDateTime fin);
}
