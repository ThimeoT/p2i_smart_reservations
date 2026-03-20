package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.RelationEquipement;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegleRelationEquipementRepository extends CrudRepository<RelationEquipement, Long>{
}
