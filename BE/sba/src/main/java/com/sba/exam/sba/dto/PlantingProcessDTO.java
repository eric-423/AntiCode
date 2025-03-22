package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class PlantingProcessDTO implements Serializable {
    private Integer plantingProcessId;
    private Integer plantId;
    private String plantingProcessName;
    private String plantingProcessDescription;
    private Date createdAt;
    private PlantingMediumProcessDTO plantingMediumProcessDTO;
    private PlantingPotProcessDTO plantingPotProcessDTO;
    private WaterProcessDTO waterProcessDTO;
    private ChemicalProcessDTO chemicalProcessDTO;
    private FarmingEquipmentProcessDTO farmingEquipmentProcessDTO;
}
