package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class PlantingLocationRequest {
    private int locationId;
    private int plantId;
    private Date startDate;
    private Date endDate;
    private boolean harvest;
}
