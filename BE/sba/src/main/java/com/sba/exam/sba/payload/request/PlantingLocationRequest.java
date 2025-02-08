package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlantingLocationRequest {
    private int areaId;
    private int plantId;
    private float locationSize;
    private String locationName;
    private String startDate;
    private String endDate;
    private boolean isHarvest;
}
