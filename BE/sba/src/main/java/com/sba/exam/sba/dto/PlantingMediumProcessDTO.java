package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlantingMediumProcessDTO {
    private int plantingMediumId;
    private Integer processId;
    private String plantingMediumName;
    private Float plantingMediumWeight;
}
