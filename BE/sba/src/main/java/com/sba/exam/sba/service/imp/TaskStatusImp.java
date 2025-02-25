package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.entity.TaskStatus;

import java.util.List;

public interface TaskStatusImp {
    public TaskStatusDTO getTaskStatusById(int id);
    public List<TaskStatusDTO> getAllTaskStatus();
    public TaskStatusDTO addTaskStatus(TaskStatusDTO taskStatusDTO);
    public TaskStatusDTO updateTaskStatus(TaskStatusDTO taskStatusDTO);
}
