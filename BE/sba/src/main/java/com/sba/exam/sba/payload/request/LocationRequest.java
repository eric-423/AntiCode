package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LocationRequest {

    private int locationId;

    private String locationName;

    private float locationExtend;

    private int areaId;

    private float locationLength;

    private float locationWidth;

}
