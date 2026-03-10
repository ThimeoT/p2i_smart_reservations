package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.Exemplaire;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExemplaireRepository extends CrudRepository<Exemplaire,Long> {
}
