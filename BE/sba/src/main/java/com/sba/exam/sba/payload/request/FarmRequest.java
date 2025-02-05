package com.sba.exam.sba.payload.request;

import lombok.Data;

@Data
public class FarmRequest {
    private int farmId;

    private String farmName;

    private float farmExtend;

    private String farmAddress;
}
