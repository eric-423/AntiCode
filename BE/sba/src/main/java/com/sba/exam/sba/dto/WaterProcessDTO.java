package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class WaterProcessDTO implements Serializable {
    private int waterId;
    private Integer processId;
    private String waterName;
    private Float purity;
    private Float phLevel;
    private Float volume;
}
