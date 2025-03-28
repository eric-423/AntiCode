package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.TaskDTO;
import com.sba.exam.sba.dto.UserDTO;
import com.sba.exam.sba.entity.Task;
import com.sba.exam.sba.entity.UserTask;
import com.sba.exam.sba.payload.TaskRequest;
import com.sba.exam.sba.payload.request.PlantingLocationTaskRequest;

import java.util.List;

public interface TaskServiceImp {
    List<TaskDTO> getTasks();
    TaskDTO getTaskById(int id);
    TaskDTO addTask(TaskRequest taskRequest);
    TaskDTO updateTask(TaskRequest taskRequest);
    List<TaskDTO> getListTaskByStatus(int statusId);
    boolean addUserTask(int taskId, int userId, int doerId);
    List<UserDTO> getListUserByTaskId(int taskId);
    List<UserDTO> getListUserUnassignedByTaskId(int taskId);
    List<TaskDTO> getListTaskByUserId(int userId, int statusId);
    boolean deleteUserTask(int taskId, int userId, int doerId);
    boolean deleteTask(List<Integer> listTaskId);
    List<TaskDTO> createdTaskWithProcessId(TaskRequest taskRequest);
    List<TaskDTO> createdTaskWithProcessName(PlantingLocationTaskRequest plantingLocationTaskRequest);
}
