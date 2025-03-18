package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlantingMediumProcessRequest {
    private int plantingMeiumId;
    private float mediumWeight;
}
