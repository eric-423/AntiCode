package com.sba.exam.sba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaterDTO {
    private int waterId;
    private String waterName;
    private double purity;
    private double pHLevel;
    private double volumeAvailable;
}
