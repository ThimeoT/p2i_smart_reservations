package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.RelationEquipement;
import com.smart_reservation.api.model.StatutRelationEquipement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationEquipementRepository extends CrudRepository<com.smart_reservation.api.model.RelationEquipement, Long>{
    Iterable<RelationEquipement> findByEquipementSourceIdAndStatutRelationEquipement(
            Long equipementId,
            StatutRelationEquipement statut
    );
}

