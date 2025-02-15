package com.sba.exam.sba.payload;

import lombok.Data;

import java.io.Serializable;

@Data
public class WaterRequest implements Serializable {
    private int waterId;
    private String waterName;
    private double purity;
    private double pHLevel;
    private double volumeAvailable;
}
