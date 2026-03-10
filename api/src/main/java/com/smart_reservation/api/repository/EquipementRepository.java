package com.smart_reservation.api.repository;


import com.smart_reservation.api.model.Equipement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipementRepository extends CrudRepository<Equipement, Long> {
}
