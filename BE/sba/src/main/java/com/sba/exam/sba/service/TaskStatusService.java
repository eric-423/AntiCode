package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.Task;
import com.sba.exam.sba.entity.TaskStatus;
import com.sba.exam.sba.entity.TaskType;
import com.sba.exam.sba.repository.TaskRepository;
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

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public TaskStatusDTO getTaskStatusById(int id) {
        TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(id);
        TaskStatusDTO taskStatusDTO = new TaskStatusDTO();
        taskStatusDTO.setTaskStatusId(taskStatus.getId());
        taskStatusDTO.setTaskStatusDescription(taskStatus.getStatusDescription());
        taskStatusDTO.setTaskStatusName(taskStatus.getStatusName());
        taskStatusDTO.setDeleted(taskStatus.isDeleted());
        return taskStatusDTO;
    }

    @Override
    public List<TaskStatusDTO> getAllTaskStatus() {
        List<TaskStatus> taskStatusList = taskStatusRepository.findAll();
        List<TaskStatusDTO> taskStatusDTOList = new ArrayList<TaskStatusDTO>();
        for (TaskStatus taskStatus : taskStatusList) {
            if(taskStatus.isDeleted() == false) {
                TaskStatusDTO taskStatusDTO = new TaskStatusDTO();
                taskStatusDTO.setTaskStatusId(taskStatus.getId());
                taskStatusDTO.setTaskStatusDescription(taskStatus.getStatusDescription());
                taskStatusDTO.setTaskStatusName(taskStatus.getStatusName());
                taskStatusDTO.setDeleted(taskStatus.isDeleted());
                taskStatusDTOList.add(taskStatusDTO);
            }
        }
        return taskStatusDTOList;
    }

    @Override
    @Transactional
    public TaskStatusDTO addTaskStatus(TaskStatusDTO taskStatusDTO) {
        try{
            TaskStatus taskStatus = new TaskStatus();
            if(taskStatusDTO.getTaskStatusName().trim().isEmpty()) throw new Exception("Status name is empty");
            taskStatus.setStatusName(taskStatusDTO.getTaskStatusName());
            taskStatus.setStatusDescription(taskStatusDTO.getTaskStatusDescription());
            taskStatus.setDeleted(false);
            taskStatusRepository.save(taskStatus);
            TaskStatusDTO result = new TaskStatusDTO();
            result.setTaskStatusId(taskStatus.getId());
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskStatusDTO updateTaskStatus(TaskStatusDTO taskStatusDTO) {
        try{
            if(taskStatusDTO.getTaskStatusName().trim().isEmpty()) throw new Exception("Task status name is empty");
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskStatusDTO.getTaskStatusId());
            taskStatus.setStatusName(taskStatusDTO.getTaskStatusName());
            taskStatus.setStatusDescription(taskStatusDTO.getTaskStatusDescription());
            taskStatus.setId(taskStatusDTO.getTaskStatusId());
            taskStatus.setDeleted(taskStatusDTO.isDeleted());
            taskStatusRepository.save(taskStatus);
            TaskStatusDTO result = new TaskStatusDTO();
            result.setTaskStatusId(taskStatus.getId());
            return result;
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteTaskStatus(int id) {
        try{
            List<Task> taskList = taskRepository.findTasksByTaskStatus_Id(id);
            if(!taskList.isEmpty() || taskList == null) throw new Exception("Cannot delete task status have in Task");
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(id);
            taskStatus.setDeleted(true);
            taskStatusRepository.save(taskStatus);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return true;
    }
}
