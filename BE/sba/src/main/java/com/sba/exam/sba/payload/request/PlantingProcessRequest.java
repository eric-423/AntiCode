package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PlantingProcessRequest {
    private  int plantId;
    private String name;
    private String description;
    List<PlantingMediumProcessRequest> plantingMediumProcessRequestList;
    List<ChemicalProcessRequest> chemicalProcessRequestList;
    private int plantPotId;
    List<WaterProcessRequest> waterProcessRequestList;
    private int farmingEquipmentId;
}
