package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AreaRequest {
    private int areaId;

    private String areaName;

    private float areaExtend;

    private int farmId;

    private float areaWidth;

    private float areaLength;
}
