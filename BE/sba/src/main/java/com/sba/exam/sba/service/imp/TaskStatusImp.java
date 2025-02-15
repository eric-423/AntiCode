package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.entity.TaskStatus;

public interface TaskStatusImp {
    public TaskStatusDTO getTaskStatusById(int id);
}
