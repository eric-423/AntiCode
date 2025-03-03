package com.sba.exam.sba.payload;

import com.sba.exam.sba.entity.TaskStatus;
import com.sba.exam.sba.entity.TaskType;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class TaskRequest implements Serializable {
    private int taskId;
    private Date createdAt;
    private Date completedAt;
    private Date startDate;
    private Date dueDate;
    private String taskDescription;
    private int taskStatus;
    private int taskType;
    private boolean isDeleted;

}
