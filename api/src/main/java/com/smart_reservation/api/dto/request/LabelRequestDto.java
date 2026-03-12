package com.smart_reservation.api.dto.request;


import com.smart_reservation.api.dto.resume.EquipementDtoReduit;

import java.util.List;

public class LabelRequestDto {

    public String nom;

    public String description;

    public String color;

    public List<EquipementDtoReduit> equipements;


}
