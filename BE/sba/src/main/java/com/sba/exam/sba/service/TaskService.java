package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.*;
import com.sba.exam.sba.entity.*;
import com.sba.exam.sba.enums.TaskFrequency;
import com.sba.exam.sba.exception.ResourceNotFoundException;
import com.sba.exam.sba.payload.TaskRequest;
import com.sba.exam.sba.payload.request.PlantingLocationTaskRequest;
import com.sba.exam.sba.payload.request.ProcessTaskRequest;
import com.sba.exam.sba.repository.*;
import com.sba.exam.sba.service.imp.TaskServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TaskService implements TaskServiceImp {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PlantingProcessRepository plantingProcessRepository;

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

    @Autowired
    private PlantProcessService plantProcessService;

    @Autowired
    private PlantingLocationRepository plantingLocationRepository;

    @Autowired
    private PlantingLocationTaskRepository plantingLocationTaskRepository;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private LocationRepository locationRepository;




    @Autowired
    private WaterRepository waterRepository;

    @Override
    public List<TaskDTO> getTasks() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskDTO> taskDTOList = new ArrayList<TaskDTO>();
        for (Task task : tasks) {
            if (task.isDeleted() == false) {
                TaskDTO taskDTO = getTaskById(task.getId());
                taskDTOList.add(taskDTO);
            }
        }
        return taskDTOList;
    }

    @Override
    public TaskDTO getTaskById(int id) {
        try {
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

            if(task.getPlantingProcess()!=null){
                PlantingProcess plantingProcess = task.getPlantingProcess();
                PlantingProcessDTO plantingProcessDTO = plantProcessService.toDTO(plantingProcess);
                taskDTO.setPlantingProcessDTO(plantingProcessDTO);
            }
            taskDTO.setTaskName(task.getTaskName());
            return taskDTO;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public TaskDTO addTask(TaskRequest taskRequest) {
        try {
            Task task = new Task();
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskRequest.getTaskStatus());
            task.setCreatedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
            task.setCompletedAt(taskRequest.getCompletedAt());
            task.setDescription(taskRequest.getTaskDescription());
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            task.setDeleted(false);
            task.setStartDate(taskRequest.getStartDate());
            task.setDueDate(taskRequest.getDueDate());
            task.setTaskName(taskRequest.getTaskName());
            taskRepository.save(task);
            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setTaskId(task.getId());
            return taskDTO;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private boolean checkValidProcess(int processId) {
        PlantingProcess plantingProcess = plantingProcessRepository.findById(processId).orElseThrow(() -> new ResourceNotFoundException("Planting Process not found"));
        PlantMedium plantMedium = plantingProcess.getPlantMedium();
        PlantPot plantPot = plantingProcess.getPlantPot();
        Water water = plantingProcess.getWater();
        FarmingEquipment farmingEquipment = plantingProcess.getFarmingEquipment();
        AgriculturalChemical agriculturalChemical = plantingProcess.getAgriculturalChemical();
        return !(plantMedium.getMediumWeightAvailable() < plantingProcess.getMediumWeight()) &&
                plantPot.getPotQuantityAvailable() >= 1 &&
                !(water.getVolumeAvailable() < plantingProcess.getWaterVolumn()) &&
                !(agriculturalChemical.getVolumeAvailable() < plantingProcess.getChemicalWeight());
    }

    @Transactional
    @Override
    public List<TaskDTO> createdTaskWithProcessName(PlantingLocationTaskRequest plantingLocationTaskRequest){
        List<TaskDTO> taskDTOS = new ArrayList<>();

        PlantingLocation plantingLocation = new PlantingLocation();
        Plant plant = plantRepository.findByPlantId(plantingLocationTaskRequest.getPlantId());
        Location location = locationRepository.findByLocationId(plantingLocationTaskRequest.getLocationId());
        location.setPlanted(true);
        locationRepository.save(location);
        plantingLocation.setPlant(plant);
        plantingLocation.setLocation(location);
        plantingLocation.setStartDate(plantingLocationTaskRequest.getStartDate());
        plantingLocation.setEndDate(plantingLocationTaskRequest.getEndDate());
        plantingLocation.setHarvest(false);
        plantingLocation.setDeleted(false);
        plantingLocation.setPlans(plantingLocationTaskRequest.getPlans());
        plantingLocationRepository.save(plantingLocation);

        for (ProcessTaskRequest processTaskRequest : plantingLocationTaskRequest.getProcessTaskRequestList()) {
            PlantingProcess plantingProcess = plantingProcessRepository.findByNameIgnoreCase(processTaskRequest.getProcessName());

            if(plantingProcess == null) {
                plantProcessService.createPlantingProcessWithDefault(processTaskRequest.getProcessName());
                plantingProcess = plantingProcessRepository.findByNameIgnoreCase(processTaskRequest.getProcessName());
            }

            int processId = plantingProcess.getId();
            if(!checkValidProcess(processId)) {
                throw new RuntimeException("Not enough resources to create task");
            }

            Task task = new Task();
            TaskType taskType = taskTypeRepository.findTaskTypeById(processTaskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(1);
            task.setCreatedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
            task.setCompletedAt(null);
            task.setDescription(null);
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            task.setDeleted(false);
            task.setStartDate(processTaskRequest.getStartDate());
            task.setDueDate(null);
            task.setTaskName(processTaskRequest.getProcessName());
            task.setPlantingProcess(plantingProcess);
            task.setFrequency(TaskFrequency.valueOf(processTaskRequest.getTaskFrequency()));
            taskRepository.save(task);

            PlantingLocationTask plantingLocationTask = new PlantingLocationTask();
            plantingLocationTask.setPlantingLocation(plantingLocation);
            plantingLocationTask.setTask(task);

            plantingLocationTaskRepository.save(plantingLocationTask);

            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setTaskId(task.getId());
            taskDTOS.add(taskDTO);
        }
        return taskDTOS;
    }

    @Override
    @Transactional
    public List<TaskDTO> createdTaskWithProcessId(TaskRequest taskRequest) {
        List<TaskDTO> taskDTOS = new ArrayList<>();
        for (Integer processId : taskRequest.getPlantingProcessIdList()) {
            PlantingProcess plantingProcess = plantingProcessRepository.findById(processId).orElseThrow(() -> new ResourceNotFoundException("Planting Process not found"));

            if(!checkValidProcess(processId)) {
                throw new RuntimeException("Not enough resources to create task");
            }

            Task task = new Task();
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskRequest.getTaskStatus());
            task.setCreatedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
            task.setCompletedAt(taskRequest.getCompletedAt());
            task.setDescription(taskRequest.getTaskDescription());
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            task.setDeleted(false);
            task.setStartDate(taskRequest.getStartDate());
            task.setDueDate(taskRequest.getDueDate());
            task.setTaskName(taskRequest.getTaskName());
            task.setPlantingProcess(plantingProcess);

            taskRepository.save(task);
            PlantingLocation plantingLocation = plantingLocationRepository.findById(taskRequest.getPlantingLocationId()).orElseThrow(() -> new ResourceNotFoundException("Planting Location not found"));
            PlantingLocationTask plantingLocationTask = new PlantingLocationTask();
            plantingLocationTask.setPlantingLocation(plantingLocation);
            plantingLocationTask.setTask(task);

            plantingLocationTaskRepository.save(plantingLocationTask);

            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setTaskId(task.getId());
            taskDTOS.add(taskDTO);
        }
        return taskDTOS;
    }



    @Override
    @Transactional
    public TaskDTO updateTask(TaskRequest taskRequest) {
        try {
            TaskDTO taskDTO = new TaskDTO();

            if (taskRequest.getCompletedAt() != null && (taskRequest.getCreatedAt().after(taskRequest.getCompletedAt()) ||
                    taskRequest.getCompletedAt().toString().isEmpty())) throw new Exception("Invalid date");
            Task task = taskRepository.findTaskById(taskRequest.getTaskId());
            TaskType taskType = taskTypeRepository.findTaskTypeById(taskRequest.getTaskType());
            TaskStatus taskStatus = taskStatusRepository.findTaskStatusById(taskRequest.getTaskStatus());
            taskDTO.setTaskId(task.getId());
            // lấy status previous dùng để reload 2 list task có status previous và vừa update
            taskDTO.setTaskStatusId(task.getTaskStatus().getId());
            if (taskRequest.getCompletedAt() != null) task.setCompletedAt(taskRequest.getCompletedAt());
            if (taskRequest.getStartDate() != null) task.setStartDate(taskRequest.getStartDate());
            if (taskRequest.getDueDate() != null) task.setDueDate(taskRequest.getDueDate());
            task.setCreatedAt(taskRequest.getCreatedAt());
            task.setDescription(taskRequest.getTaskDescription());
            task.setTaskStatus(taskStatus);
            task.setTaskType(taskType);
            task.setDeleted(taskRequest.isDeleted());
            task.setTaskName(taskRequest.getTaskName());

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
        try {
            Task task = taskRepository.findTaskById(taskId);
            Users user = userService.getUserById(userId);
            Users doer = userService.getUserById(doerId);
            List<UserTask> userTasks = task.getUserTasks();
            UserTask userTask = new UserTask();
            userTask.setUser(user);
            //khi assign task thì sẽ set startDate ngay lúc assgin
            //task.setStartDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
            userTask.setTask(task);
            userTasks.add(userTask);
            task.setUserTasks(userTasks);
            taskRepository.save(task);
            RecentActivity recentActivity = new RecentActivity();
            recentActivity.setReceiver(user);
            recentActivity.setDoer(doer);
            recentActivity.setDescription("has assigned the task #" + task.getId() + " to you!");
            recentActivity.setDate(new Date());
            recentActivityRepository.save(recentActivity);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<UserDTO> getListUserByTaskId(int taskId) {
        try {
            Task task = taskRepository.findTaskById(taskId);
            List<UserDTO> userDTOS = new ArrayList<>();
            for (UserTask userTask : task.getUserTasks()) {
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
        try {
            Task task = taskRepository.findTaskById(taskId);
            List<UserDTO> userDTOS = new ArrayList<>();
            List<Integer> userTasksID = new ArrayList<>();
            for (UserTask userTask : task.getUserTasks()) {
                userTasksID.add(userTask.getUser().getId());
            }
            List<Users> users = userRepository.getUsersUnAssignedByUserTasks(userTasksID);
            users.forEach(user -> {
                if (user.getRole().getName().equals("Worker")) {
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
        try {
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
        try {
            userTaskRepository.deleteUserTaskByUser_IdAndTask_Id(userId, taskId);
            RecentActivity recentActivity = new RecentActivity();
            Users user = userService.getUserById(userId);
            Users doer = userService.getUserById(doerId);
            recentActivity.setReceiver(user);
            recentActivity.setDoer(doer);
            recentActivity.setDescription("has deleted you from the task #" + taskId + " !");
            recentActivity.setDate(new Date());
            recentActivityRepository.save(recentActivity);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteTask(List<Integer> listTaskId) {
        try {
            List<Task> taskList = taskRepository.findAllById(listTaskId);
            for (Task task : taskList) {
                task.setDeleted(true);
                taskRepository.save(task);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return true;
    }

}
