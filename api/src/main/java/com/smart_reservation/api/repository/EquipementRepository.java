package com.smart_reservation.api.repository;


import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.Label;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipementRepository extends CrudRepository<Equipement, Long> {

    public Iterable<Equipement> findByLabels_IdIn(List<Long> labelIds);

}
