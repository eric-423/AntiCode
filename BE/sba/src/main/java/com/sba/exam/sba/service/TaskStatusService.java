package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.TaskStatus;
import com.sba.exam.sba.entity.TaskType;
import com.sba.exam.sba.repository.TaskStatusRepository;
import com.sba.exam.sba.service.imp.TaskStatusImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<TaskStatusDTO> getAllTaskStatus() {
        List<TaskStatus> taskStatusList = taskStatusRepository.findAll();
        List<TaskStatusDTO> taskStatusDTOList = new ArrayList<TaskStatusDTO>();
        for (TaskStatus taskStatus : taskStatusList) {
            TaskStatusDTO taskStatusDTO = new TaskStatusDTO();
            taskStatusDTO.setTaskStatusId(taskStatus.getId());
            taskStatusDTO.setTaskStatusDescription(taskStatus.getStatusDescription());
            taskStatusDTO.setTaskStatusName(taskStatus.getStatusName());
            taskStatusDTOList.add(taskStatusDTO);
        }
        return taskStatusDTOList;
    }

    @Override
    @Transactional
    public TaskStatusDTO addTaskStatus(TaskStatusDTO taskStatusDTO) {
        try{
            TaskStatus taskStatus = new TaskStatus();
            taskStatus.setStatusName(taskStatusDTO.getTaskStatusName());
            taskStatus.setStatusDescription(taskStatusDTO.getTaskStatusDescription());
            taskStatusRepository.save(taskStatus);
            return getTaskStatusById(taskStatusDTO.getTaskStatusId());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskStatusDTO updateTaskStatus(TaskStatusDTO taskStatusDTO) {
        try{
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskStatusDTO.getTaskStatusId());
            taskStatus.setStatusName(taskStatusDTO.getTaskStatusName());
            taskStatus.setStatusDescription(taskStatusDTO.getTaskStatusDescription());
            taskStatus.setId(taskStatusDTO.getTaskStatusId());
            taskStatusRepository.save(taskStatus);
            return getTaskStatusById(taskStatusDTO.getTaskStatusId());
        }catch(Exception e){
            throw new RuntimeException();
        }
    }
}
