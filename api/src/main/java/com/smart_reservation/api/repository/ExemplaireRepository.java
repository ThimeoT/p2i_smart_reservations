package com.smart_reservation.api.repository;

import com.smart_reservation.api.model.Exemplaire;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExemplaireRepository extends CrudRepository<Exemplaire,Long> {
    @Query("""
    SELECT ex FROM Exemplaire ex
    WHERE ex.equipement.id = :equipementId
    AND NOT EXISTS (
        SELECT e FROM Emprunt e
        WHERE e.exemplaire = ex
        AND e.dateRetourReelle IS NULL
        AND e.session.debut < :dateFin
        AND e.session.fin > :dateDebut
    )
""")
    List<Exemplaire> findExemplairesDisponibles(
            @Param("equipementId") Long equipementId,
            @Param("dateDebut") LocalDateTime dateDebut,
            @Param("dateFin") LocalDateTime dateFin
    );

    Iterable<Exemplaire> findAllByEquipement_Id(Long equipementId);
}
