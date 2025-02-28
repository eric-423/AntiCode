package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.Task;
import com.sba.exam.sba.entity.TaskType;
import com.sba.exam.sba.repository.TaskRepository;
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

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public TaskTypeDTO getTaskTypeById(int id) {
        TaskType taskType = taskTypeRepository.findTaskTypeById(id);
        TaskTypeDTO taskTypeDTO = new TaskTypeDTO();
        taskTypeDTO.setTaskTypeId(taskType.getId());
        taskTypeDTO.setTaskTypeDesc(taskType.getTypeDescription());
        taskTypeDTO.setTaskTypeName(taskType.getTypeName());
        taskTypeDTO.setDeleted(taskType.isDeleted());
        return taskTypeDTO;
    }

    @Override
    public List<TaskTypeDTO> getAllTaskTypes() {
        List<TaskType> taskTypes = taskTypeRepository.findAll();
        List<TaskTypeDTO> taskTypeDTOs = new ArrayList<TaskTypeDTO>();
        for (TaskType taskType : taskTypes) {
            if(taskType.isDeleted() == false) {
                TaskTypeDTO taskTypeDTO = new TaskTypeDTO();
                taskTypeDTO.setTaskTypeId(taskType.getId());
                taskTypeDTO.setTaskTypeDesc(taskType.getTypeDescription());
                taskTypeDTO.setTaskTypeName(taskType.getTypeName());
                taskTypeDTO.setDeleted(taskType.isDeleted());
                taskTypeDTOs.add(taskTypeDTO);
            }
        }
        return taskTypeDTOs;
    }

    @Override
    @Transactional
    public TaskTypeDTO addTaskType(TaskTypeDTO taskTypeDTO) {
        try{
            TaskType taskType = new TaskType();
            if(taskTypeDTO.getTaskTypeName().isEmpty()) throw new Exception("Task type name is empty");
            taskType.setTypeName(taskTypeDTO.getTaskTypeName());
            taskType.setTypeDescription(taskTypeDTO.getTaskTypeDesc());
            taskType.setDeleted(false);
            taskTypeRepository.save(taskType);
            TaskTypeDTO taskTypeDTO2 = new TaskTypeDTO();
            taskTypeDTO2.setTaskTypeId(taskType.getId());
            return taskTypeDTO2;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskTypeDTO updateTaskType(TaskTypeDTO taskTypeDTO) {
        try{
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskTypeDTO.getTaskTypeId());
            if(taskTypeDTO.getTaskTypeName().isEmpty()) throw new Exception("Task type name is empty");
            taskType.setTypeName(taskTypeDTO.getTaskTypeName());
            taskType.setTypeDescription(taskTypeDTO.getTaskTypeDesc());
            taskType.setDeleted(taskTypeDTO.isDeleted());
            taskTypeRepository.save(taskType);
            TaskTypeDTO result = new TaskTypeDTO();
            result.setTaskTypeId(taskType.getId());
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteTaskType(int id) {
        try{
            List<Task> taskList = taskRepository.findTasksByTaskType_Id(id);
            if(!taskList.isEmpty() || taskList == null) throw new Exception();
            TaskType taskType = taskTypeRepository.findTaskTypeById(id);
            taskType.setDeleted(true);
            taskTypeRepository.save(taskType);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return true;
    }

}
