package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.TaskDTO;
import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.dto.UserDTO;
import com.sba.exam.sba.entity.*;
import com.sba.exam.sba.payload.TaskRequest;
import com.sba.exam.sba.repository.*;
import com.sba.exam.sba.service.imp.TaskServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserTaskRepository userTaskRepository;

    @Autowired
    private RecentActivityRepository recentActivityRepository;

    @Override
    public List<TaskDTO> getTasks() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskDTO> taskDTOList = new ArrayList<TaskDTO>();
        for (Task task : tasks) {
            if(task.isDeleted() == false) {
                TaskDTO taskDTO = getTaskById(task.getId());
                taskDTOList.add(taskDTO);
            }
        }
        return taskDTOList;
    }

    @Override
    public TaskDTO getTaskById(int id) {
        try{
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
            taskDTO.setStartDate(task.getStartDate());
            taskDTO.setDueDate(task.getDueDate());
            taskDTO.setDeleted(task.isDeleted());
            return taskDTO;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskDTO addTask(TaskRequest taskRequest) {
        try{
//            if(taskRequest.getCreatedAt().after(taskRequest.getCompletedAt())) throw new Exception("Invalid date");
            Task task = new Task();
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskRequest.getTaskStatus());
            task.setCreatedAt(taskRequest.getCreatedAt());
            task.setCompletedAt(taskRequest.getCompletedAt());
            task.setDescription(taskRequest.getTaskDescription());
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            task.setDeleted(false);
            taskRepository.save(task);
            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setTaskId(task.getId());
            return taskDTO;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskDTO updateTask(TaskRequest taskRequest) {
        try{
            TaskDTO taskDTO = new TaskDTO();

            if(taskRequest.getCompletedAt() != null && ( taskRequest.getCreatedAt().after(taskRequest.getCompletedAt())||
                    taskRequest.getCompletedAt().toString().isEmpty())) throw new Exception("Invalid date");
            Task task = taskRepository.findTaskById(taskRequest.getTaskId());
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskRequest.getTaskStatus());
            taskDTO.setTaskId(task.getId());
            // lấy status previous dùng để reload 2 list task có status previous và vừa update
            taskDTO.setTaskStatusId(task.getTaskStatus().getId());
            if(taskRequest.getCompletedAt() != null)   task.setCompletedAt(taskRequest.getCompletedAt());
            if(taskRequest.getStartDate() != null)   task.setStartDate(taskRequest.getStartDate());
            if(taskRequest.getDueDate() != null)   task.setDueDate(taskRequest.getDueDate());
            task.setCreatedAt(taskRequest.getCreatedAt());
            task.setDescription(taskRequest.getTaskDescription());
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            task.setDeleted(taskRequest.isDeleted());
            taskRepository.save(task);
            return taskDTO;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<TaskDTO> getListTaskByStatus(int statusId) {
        List<Task> tasks = taskRepository.findTasksByTaskStatus_Id(statusId);
        List<TaskDTO> taskDTOList = new ArrayList<TaskDTO>();
        for (Task task : tasks) {
            TaskDTO taskDTO = getTaskById(task.getId());
            taskDTOList.add(taskDTO);
        }
        return taskDTOList;
    }

    @Override
    public boolean addUserTask(int taskId, int userId, int doerId) {
        try{
            Task task = taskRepository.findTaskById(taskId);
            Users user = userService.getUserById(userId);
            Users doer = userService.getUserById(doerId);
            List<UserTask> userTasks = task.getUserTasks();
            UserTask userTask = new UserTask();
            userTask.setUser(user);
            userTask.setTask(task);
            userTasks.add(userTask);
            task.setUserTasks(userTasks);
            taskRepository.save(task);
            RecentActivity recentActivity = new RecentActivity();
            recentActivity.setReceiver(user);
            recentActivity.setDoer(doer);
            recentActivity.setDescription("has assigned the task #" + task.getId()+" to you!");
            recentActivity.setDate(new Date());
            recentActivityRepository.save(recentActivity);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<UserDTO> getListUserByTaskId(int taskId) {
        try{
            Task task = taskRepository.findTaskById(taskId);
            List<UserDTO> userDTOS = new ArrayList<>();
            for(UserTask userTask : task.getUserTasks()) {
                UserDTO userDTO = new UserDTO();
                userDTO.setId(userTask.getUser().getId());
                userDTO.setUserName(userTask.getUser().getUserName());
                userDTO.setEmail(userTask.getUser().getUserEmail());
                userDTOS.add(userDTO);
            }
            return userDTOS;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<UserDTO> getListUserUnassignedByTaskId(int taskId) {
        try{
            Task task = taskRepository.findTaskById(taskId);
            List<UserDTO> userDTOS = new ArrayList<>();
            List<Integer> userTasksID = new ArrayList<>();
            for(UserTask userTask : task.getUserTasks()) {
                userTasksID.add(userTask.getUser().getId());
            }
            List<Users> users =  userRepository.getUsersUnAssignedByUserTasks(userTasksID);
             users.forEach(user -> {
                if(user.getRole().getName().equals("Worker")){
                    UserDTO userDTO = new UserDTO();
                    userDTO.setId(user.getId());
                    userDTO.setUserName(user.getUserName());
                    userDTO.setEmail(user.getUserEmail());
                    userDTOS.add(userDTO);
                }
            });
            return userDTOS;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public List<TaskDTO> getListTaskByUserId(int userId, int statusId) {
        try{
            List<Task> tasks = taskRepository.findTasksByUserID(userId, statusId);
            List<TaskDTO> taskDTOS = new ArrayList<>();
            for (Task task : tasks) {
                TaskDTO taskDTO = new TaskDTO();
                taskDTO.setTaskId(task.getId());
                taskDTO.setCreatedAt(task.getCreatedAt());
                taskDTO.setCompletedAt(task.getCompletedAt());
                taskDTO.setStartDate(task.getStartDate());
                taskDTO.setDueDate(task.getDueDate());
                taskDTO.setTaskDescription(task.getDescription());
                taskDTO.setTaskStatusId(task.getTaskStatus().getId());
                taskDTO.setTaskStatusName(task.getTaskStatus().getStatusName());
                taskDTO.setTaskStatusDescription(task.getTaskStatus().getStatusDescription());
                taskDTO.setTaskTypeId(task.getTaskType().getId());
                taskDTO.setTaskTypeName(task.getTaskType().getTypeName());
                taskDTO.setTaskTypeDescription(task.getTaskType().getTypeDescription());
                taskDTOS.add(taskDTO);
            }
            return taskDTOS;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public boolean deleteUserTask(int taskId, int userId, int doerId) {
        try{
            userTaskRepository.deleteUserTaskByUser_IdAndTask_Id(userId,taskId);
            RecentActivity recentActivity = new RecentActivity();
            Users user = userService.getUserById(userId);
            Users doer = userService.getUserById(doerId);
            recentActivity.setReceiver(user);
            recentActivity.setDoer(doer);
            recentActivity.setDescription("has deleted you from the task #" + taskId+" !");
            recentActivity.setDate(new Date());
            recentActivityRepository.save(recentActivity);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteTask(List<Integer> listTaskId) {
        try{
            List<Task> taskList = taskRepository.findAllById(listTaskId);
            for(Task task : taskList) {
                task.setDeleted(true);
                taskRepository.save(task);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return true;
    }

}
