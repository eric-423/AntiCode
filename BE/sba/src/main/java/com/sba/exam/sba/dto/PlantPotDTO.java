package com.sba.exam.sba.dto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlantPotDTO {

    private int potId;

    private String potSize;

    private String potMaterial;

    private int potQuantityAvailable;

}
