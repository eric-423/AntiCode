package com.sba.exam.sba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaterTaskDTO {
    private int taskId;
    private int waterId;
    private double volumeAvailable;
}
