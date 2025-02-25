package com.sba.exam.sba.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PlantMediumDTO {

    private int mediumId;

    private String mediumName;

    private String description;

    private int mediumWeightAvailable;
}
