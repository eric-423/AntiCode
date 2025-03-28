package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@Data
public class ProcessTaskRequest implements Serializable {
    private String processName;
    private String taskFrequency;
    private int taskType;
    private Date startDate;
}
