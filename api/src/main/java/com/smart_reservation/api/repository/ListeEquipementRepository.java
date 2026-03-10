package com.smart_reservation.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.smart_reservation.api.model.ListeEquipement;

@Repository
public interface ListeEquipementRepository extends CrudRepository<ListeEquipement, Long> {
}
