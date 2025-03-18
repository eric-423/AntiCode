package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChemicalProcessRequest {
    private int chemicalId;
    private float chemicalVolumn;
}
