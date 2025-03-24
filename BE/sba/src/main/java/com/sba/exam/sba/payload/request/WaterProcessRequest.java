package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WaterProcessRequest {
    private int waterId;
    private float waterVolumn;
}
