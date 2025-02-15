package com.sba.exam.sba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskTypeDTO {
    private int taskTypeId;
    private String taskTypeName;
    private String taskTypeDesc;
}
