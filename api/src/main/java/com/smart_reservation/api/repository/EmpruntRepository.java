package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.Emprunt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpruntRepository extends CrudRepository<Emprunt,Long> {
}
