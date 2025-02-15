package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.TaskStatus;
import com.sba.exam.sba.entity.TaskType;
import com.sba.exam.sba.repository.TaskStatusRepository;
import com.sba.exam.sba.service.imp.TaskStatusImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskStatusService implements TaskStatusImp {

    @Autowired
    private TaskStatusRepository taskStatusRepository;

    @Override
    public TaskStatusDTO getTaskStatusById(int id) {
        TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(id);
        TaskStatusDTO taskStatusDTO = new TaskStatusDTO();
        taskStatusDTO.setTaskStatusId(taskStatus.getId());
        taskStatusDTO.setTaskStatusDescription(taskStatus.getStatusDescription());
        taskStatusDTO.setTaskStatusName(taskStatus.getStatusName());
        return taskStatusDTO;
    }
}
