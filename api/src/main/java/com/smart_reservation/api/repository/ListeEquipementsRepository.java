package com.smart_reservation.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.smart_reservation.api.model.ListeEquipements;

@Repository
public interface ListeEquipementsRepository extends CrudRepository<ListeEquipements, Long> {
    Iterable<ListeEquipements> findByUtilisateurId(Long id);
}
