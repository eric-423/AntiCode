package com.sba.exam.sba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatusDTO {
    private int taskStatusId;
    private String taskStatusName;
    private String taskStatusDescription;
    private boolean isDeleted;
}
