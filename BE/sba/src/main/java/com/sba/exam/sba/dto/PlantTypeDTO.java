package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlantTypeDTO {
    private int plantTypeId;
    private String plantTypeName;
    private String typeDescription;
}
