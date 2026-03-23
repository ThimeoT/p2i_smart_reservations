package com.smart_reservation.api.dto.response;


import com.smart_reservation.api.dto.resume.EquipementResumeDto;

import java.util.List;

public class LabelResponseDto {

    public Long id;

    public String nom;

    public String description;

    public String color;

    public List<EquipementResumeDto> equipements;


}
