package com.sba.exam.sba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AreaDTO implements Serializable {
    private int areaId;

    private String areaName;

    private float areaExtend;

    private float areaWidth;

    private float areaLength;

    private int locationAvailable;

    private int locations;

    private FarmDTO farm;
}
