package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.TaskType;
import com.sba.exam.sba.repository.TaskTypeRepository;
import com.sba.exam.sba.service.imp.TaskTypeImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<TaskTypeDTO> getAllTaskTypes() {
        List<TaskType> taskTypes = taskTypeRepository.findAll();
        List<TaskTypeDTO> taskTypeDTOs = new ArrayList<TaskTypeDTO>();
        for (TaskType taskType : taskTypes) {
            TaskTypeDTO taskTypeDTO = new TaskTypeDTO();
            taskTypeDTO.setTaskTypeId(taskType.getId());
            taskTypeDTO.setTaskTypeDesc(taskType.getTypeDescription());
            taskTypeDTO.setTaskTypeName(taskType.getTypeName());
            taskTypeDTOs.add(taskTypeDTO);
        }
        return taskTypeDTOs;
    }

    @Override
    @Transactional
    public TaskTypeDTO addTaskType(TaskTypeDTO taskTypeDTO) {
        try{
            TaskType taskType = new TaskType();
            taskType.setTypeName(taskTypeDTO.getTaskTypeName());
            taskType.setTypeDescription(taskTypeDTO.getTaskTypeDesc());
            taskTypeRepository.save(taskType);
            return getTaskTypeById(taskTypeDTO.getTaskTypeId());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskTypeDTO updateTaskType(TaskTypeDTO taskTypeDTO) {
        try{
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskTypeDTO.getTaskTypeId());
            taskType.setTypeName(taskTypeDTO.getTaskTypeName());
            taskType.setTypeDescription(taskTypeDTO.getTaskTypeDesc());
            taskTypeRepository.save(taskType);
            return getTaskTypeById(taskTypeDTO.getTaskTypeId());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
