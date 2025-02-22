package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.TaskType;

import java.util.List;

public interface TaskTypeImp {
    public TaskTypeDTO getTaskTypeById(int id);
    public List<TaskTypeDTO> getAllTaskTypes();
    public TaskTypeDTO addTaskType(TaskTypeDTO taskTypeDTO);
    public TaskTypeDTO updateTaskType(TaskTypeDTO taskTypeDTO);
}
