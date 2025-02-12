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
    private float plantPrice;
    private String plantSize;
    private boolean isSeed;
    private String plantSpecies;
    private String plantDescription;
    private String plantCharacteristics;
    private String plantAttracts;
    private String plantHardiness;
    private String plantHeatZones;
    private int locationId;
    private String locationName;
    private float locationExtent;
    private Date startDate;
    private Date endDate;
    private boolean isHarvest;
}
