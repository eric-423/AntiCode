package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class PlantingLocationTaskRequest implements Serializable {
    private int locationId;
    private int plantId;
    private Date startDate;
    private Date endDate;
    private Long plans;
    private List<ProcessTaskRequest> processTaskRequestList;
}
