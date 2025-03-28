package com.sba.exam.sba.payload;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class TaskRequest implements Serializable {
    private int taskId;
    private Date createdAt;
    private Date completedAt;
    private Date startDate;
    private LocalDate dueDate;
    private String taskDescription;
    private int taskStatus;
    private int taskType;
    private boolean isDeleted;
    private String taskName;
    private int plantingLocationId;
    private List<Integer> plantingProcessIdList;
}
