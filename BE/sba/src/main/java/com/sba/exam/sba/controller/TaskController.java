package com.sba.exam.sba.controller;


import com.sba.exam.sba.dto.TaskDTO;
import com.sba.exam.sba.payload.TaskRequest;
import com.sba.exam.sba.service.imp.TaskServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    TaskServiceImp taskServiceImp;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @GetMapping()
    public ResponseEntity<?> getAllTasks() {
        return new ResponseEntity<>(taskServiceImp.getTasks(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable int id) {
        return new ResponseEntity<>(taskServiceImp.getTaskById(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> addTask(@RequestBody TaskRequest taskRequest) {
        return new ResponseEntity<>(taskServiceImp.addTask(taskRequest), HttpStatus.CREATED);
    }

    @PutMapping()
    @SendTo("/topic/tasks")
    public ResponseEntity<?> updateTask(@RequestBody TaskRequest taskRequest) {
        TaskDTO taskDTO = taskServiceImp.updateTask(taskRequest);
        messagingTemplate.convertAndSend("/topic/tasks",taskRequest.getTaskStatus() +"|"+taskDTO.getTaskStatusId());
        return new ResponseEntity<>(taskDTO, HttpStatus.OK);
    }

    @GetMapping("/task-status")
    public ResponseEntity<?> getListTasksByStatus(@RequestParam int statusId){
        return new ResponseEntity<>(taskServiceImp.getListTaskByStatus(statusId), HttpStatus.OK);
    }

    @PostMapping("/users")
    @SendTo("/topic/tasks/users")
    public ResponseEntity<?> addUser(@RequestParam int taskID, @RequestParam int userID, @RequestParam int doerId ) {
        messagingTemplate.convertAndSend("/topic/tasks/users",userID);
        return new ResponseEntity<>(taskServiceImp.addUserTask(taskID, userID, doerId), HttpStatus.CREATED);
    }
    
    @DeleteMapping("/users")
    @SendTo("/topic/tasks/users")
    public ResponseEntity<?> deleteUser(@RequestParam int taskID, @RequestParam int userID, @RequestParam int doerId) {
        messagingTemplate.convertAndSend("/topic/tasks/users",userID);
        return new ResponseEntity<>(taskServiceImp.deleteUserTask(taskID, userID, doerId), HttpStatus.CREATED);
    }

    
    @GetMapping("/users-assigned")
    public ResponseEntity<?> getAssignedUsers(@RequestParam int taskID) {
        return new ResponseEntity<>(taskServiceImp.getListUserByTaskId(taskID), HttpStatus.OK);
    }

    @GetMapping("/users-un-assigned")
    public ResponseEntity<?> getUnAssignedUsers(@RequestParam int taskID) {
        return new ResponseEntity<>(taskServiceImp.getListUserUnassignedByTaskId(taskID), HttpStatus.OK);
    }

    @GetMapping("/user-task")
    public ResponseEntity<?> getTaskByUserID(@RequestParam int userId, @RequestParam int statusId) {
        return new ResponseEntity<>(taskServiceImp.getListTaskByUserId(userId, statusId), HttpStatus.OK);
    }
}
