package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PlantingProcessRequest {
    private Integer plantId;
    private String name;
    private String description;
    private Integer plantingMediumId;
    private Float mediumWeight;
    private Integer chemicalId;
    private Float chemicalVolumn;
    private Integer plantPotId;
    private Integer waterId;
    private Float waterVolumn;
    private Integer farmingEquipmentId;
}
