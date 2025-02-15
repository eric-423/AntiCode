package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class PlantDTO implements Serializable {
    private int plantId;

    private String plantName;

    private int quantity;

    private float price;

    private String size;

    private boolean isSeed;

    private String species;

    private String description;

    private String characteristics;

    private String attracts;

    private String hardiness;

    private String heatZones;

    private int plantTypeId;
}
