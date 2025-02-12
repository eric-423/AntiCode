package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class LocationDTO implements Serializable {
    private int locationId;

    private String locationName;

    private float locationExtent;

}
