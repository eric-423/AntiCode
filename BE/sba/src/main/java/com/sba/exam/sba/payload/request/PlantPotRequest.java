package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlantPotRequest {

    private int potId;

    private String potSize;

    private String potMaterial;

    private int potQuantityAvailable;
}
