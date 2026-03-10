package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.HistoriqueReservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoriqueReservationRepository extends CrudRepository<HistoriqueReservation, Long> {
}
