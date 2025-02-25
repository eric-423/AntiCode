package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PlantMediumRequest {

    private int mediumId;

    private String mediumName;

    private String description;

    private int mediumWeightAvailable;
}
