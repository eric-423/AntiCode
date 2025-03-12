package com.sba.exam.sba.payload;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

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
    private int equipmentId;
    private PlantPotTaskRequest plantPotTask;
    private PlantMediumTaskRequest plantMediumTask;
    private ChemicalTaskRequest chemicalTaskRequest;
    private WaterTaskRequest waterTaskRequest;

}
