package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ChemicalProcessDTO implements Serializable {
    private int chemicalId;
    private Integer processId;
    private String chemicalName;
    private Float chemicalVolume;
    private String chemicalDescription;
}
