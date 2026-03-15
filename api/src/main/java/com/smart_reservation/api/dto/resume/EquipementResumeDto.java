package com.smart_reservation.api.dto.resume;

import com.smart_reservation.api.dto.response.LabelResponseDto;

import java.util.List;

public class EquipementResumeDto {

    public Long id;

    public String nom;

    public String urlImage;

    public List<LabelResponseDto> labels;
}
