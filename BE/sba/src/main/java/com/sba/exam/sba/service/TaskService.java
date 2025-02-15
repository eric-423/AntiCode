package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskDTO;
import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.entity.Task;
import com.sba.exam.sba.entity.TaskStatus;
import com.sba.exam.sba.entity.TaskType;
import com.sba.exam.sba.payload.TaskRequest;
import com.sba.exam.sba.repository.TaskRepository;
import com.sba.exam.sba.repository.TaskStatusRepository;
import com.sba.exam.sba.repository.TaskTypeRepository;
import com.sba.exam.sba.service.imp.TaskServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TaskService implements TaskServiceImp {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskTypeRepository taskTypeRepository;

    @Autowired
    private TaskStatusRepository taskStatusRepository;

    @Autowired
    private TaskTypeService taskTypeService;

    @Autowired
    private TaskStatusService taskStatusService;

    @Override
    public List<TaskDTO> getTasks() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskDTO> taskDTOList = new ArrayList<TaskDTO>();
        for (Task task : tasks) {
            TaskDTO taskDTO = getTaskById(task.getId());
            taskDTOList.add(taskDTO);
        }
        return taskDTOList;
    }

    @Override
    public TaskDTO getTaskById(int id) {
        Task task = taskRepository.findTaskById(id);
        TaskTypeDTO taskTypeDTO = taskTypeService.getTaskTypeById(task.getTaskType().getId());
        TaskStatusDTO taskStatusDTO = taskStatusService.getTaskStatusById(task.getTaskStatus().getId());
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setTaskId(task.getId());
        taskDTO.setTaskTypeId(taskTypeDTO.getTaskTypeId());
        taskDTO.setTaskTypeName(taskTypeDTO.getTaskTypeName());
        taskDTO.setTaskTypeDescription(taskTypeDTO.getTaskTypeDesc());
        taskDTO.setTaskStatusId(taskStatusDTO.getTaskStatusId());
        taskDTO.setTaskStatusName(taskStatusDTO.getTaskStatusName());
        taskDTO.setTaskStatusDescription(taskStatusDTO.getTaskStatusDescription());
        taskDTO.setTaskDescription(task.getDescription());
        taskDTO.setCompletedAt(task.getCompletedAt());
        taskDTO.setCreatedAt(task.getCreatedAt());
        return taskDTO;
    }

    @Override
    @Transactional
    public TaskDTO addTask(TaskRequest taskRequest) {
        try{
            Task task = new Task();
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskRequest.getTaskStatus());

            task.setCompletedAt(taskRequest.getCompletedAt());
            task.setCreatedAt(new Date());
            task.setDescription(taskRequest.getTaskDescription());
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            taskRepository.save(task);

            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setTaskId(task.getId());
            return getTaskById(task.getId());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskDTO updateTask(TaskRequest taskRequest) {
        try{
            Task task = taskRepository.findTaskById(taskRequest.getTaskId());
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskRequest.getTaskStatus());

            task.setCompletedAt(taskRequest.getCompletedAt());
            task.setCreatedAt(taskRequest.getCreatedAt());
            task.setDescription(taskRequest.getTaskDescription());
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            taskRepository.save(task);
            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setTaskId(task.getId());
            return getTaskById(task.getId());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
