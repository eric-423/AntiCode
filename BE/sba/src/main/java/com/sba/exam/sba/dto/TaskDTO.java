package com.sba.exam.sba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private int taskId;
    private Date createdAt;
    private Date completedAt;
    private Date startDate;
    private Date dueDate;
    private String taskDescription;
    private int taskStatusId;
    private String taskStatusName;
    private String taskStatusDescription;
    private int taskTypeId;
    private String taskTypeName;
    private String taskTypeDescription;

}
