package com.smart_reservation.api.controller;

import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.service.EquipementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/equipements")
public class EquipementController {

    @Autowired
    private EquipementService equipementService;


    // TODO : get equipements /




    // TODO : get equipements / id


    // TODO : get equipements / labels

    // TODO : post equipements

    // TODO : put equipements / id

    // TODO : delete equipements / id

    // -- relations

    // TODO : GET equipements/{id}/relations

    // TODO : GET /equipements/{id}/relations/{id}

    // TODO : PUT equipements/{id}/relations/{id}

    // TODO : POST equipements/{id}/relations

    // TODO : DELETE equipements/{id}/relations/{id}

    // -- labels --

    // TODO : GET equipements/{id}/labels

    // TODO : PUT equipements/{id}/labels

    // TODO : POST equipements/{id}/labels

    // TODO : DELETE equipements/{id}/labels/{id}


    // -- exemplaires --

    // TODO : GET equipements/{id}/exemplaires

    // TODO : Get équipements/{idEquipement}/exemplaires/{id}


    // TODO :

    // TODO :

    // TODO :

    // TODO :

    // TODO :

}
