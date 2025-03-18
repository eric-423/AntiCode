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
    private List<PlantingMediumProcessDTO> plantingMediumProcessDTO;
    private List<PlantingPotProcessDTO> plantingPotProcessDTO;
    private List<WaterProcessDTO> waterProcessDTO;
    private List<ChemicalProcessDTO> chemicalProcessDTO;
    private List<FarmingEquipmentProcessDTO> farmingEquipmentProcessDTO;
}
