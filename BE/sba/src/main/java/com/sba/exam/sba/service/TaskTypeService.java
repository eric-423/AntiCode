package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.TaskType;
import com.sba.exam.sba.repository.TaskTypeRepository;
import com.sba.exam.sba.service.imp.TaskTypeImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskTypeService implements TaskTypeImp {

    @Autowired
    private TaskTypeRepository taskTypeRepository;

    @Override
    public TaskTypeDTO getTaskTypeById(int id) {
        TaskType taskType = taskTypeRepository.findTaskTypeById(id);
        TaskTypeDTO taskTypeDTO = new TaskTypeDTO();
        taskTypeDTO.setTaskTypeId(taskType.getId());
        taskTypeDTO.setTaskTypeDesc(taskType.getTypeDescription());
        taskTypeDTO.setTaskTypeName(taskType.getTypeName());
        return taskTypeDTO;
    }
}
