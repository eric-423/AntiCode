package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class FarmingEquipmentProcessDTO implements Serializable {
    private int equipmentId;
    private Integer processId;
    private String equipmentName;
}
