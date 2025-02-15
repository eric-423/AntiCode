package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.TaskDTO;
import com.sba.exam.sba.entity.Task;
import com.sba.exam.sba.payload.TaskRequest;

import java.util.List;

public interface TaskServiceImp {
    List<TaskDTO> getTasks();
    TaskDTO getTaskById(int id);
    TaskDTO addTask(TaskRequest taskRequest);
    TaskDTO updateTask(TaskRequest taskRequest);
}
