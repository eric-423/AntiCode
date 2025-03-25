package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlantingPotProcessDTO {
    private int plantingPotId;
    private Integer processId;
    private String plantingPotSize;
    private String plantingPotMaterial;
}
