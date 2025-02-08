package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
public class PlantingLocationDTO implements Serializable {
    private int plantingLocationId;
    private int plantId;
    private String plantName;
    private int areaId;
    private String areaName;
    private float locationSize;
    private String locationName;
    private Date startDate;
    private Date endDate;
    private boolean isHarvest;
}
