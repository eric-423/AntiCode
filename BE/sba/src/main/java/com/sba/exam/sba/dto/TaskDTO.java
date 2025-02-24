package com.sba.exam.sba.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private int taskId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date completedAt;
    private String taskDescription;
    private int taskStatusId;
    private String taskStatusName;
    private String taskStatusDescription;
    private int taskTypeId;
    private String taskTypeName;
    private String taskTypeDescription;
}
