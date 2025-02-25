package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FarmRequest {

    private String farmName;

    private float farmExtend;

    private String farmAddress;

    private float farmWidth;

    private float farmLength;

}
