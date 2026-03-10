package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.GroupeEquipement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupeEquipementRepository extends CrudRepository<GroupeEquipement, Long>
{
}
