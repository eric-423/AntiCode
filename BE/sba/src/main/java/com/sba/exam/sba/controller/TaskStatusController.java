package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.TaskStatusDTO;
import com.sba.exam.sba.entity.TaskStatus;
import com.sba.exam.sba.service.imp.TaskStatusImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task-status")
public class TaskStatusController {

    @Autowired
    private TaskStatusImp taskStatusImp;

    @GetMapping()
    public ResponseEntity<?> getAllTaskStatus(){
        return new ResponseEntity<>(taskStatusImp.getAllTaskStatus(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskStatusById(@PathVariable int id){
        return new ResponseEntity<>(taskStatusImp.getTaskStatusById(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> addTaskStatus(@RequestBody TaskStatusDTO taskStatusDTO){
        return new ResponseEntity<>(taskStatusImp.addTaskStatus(taskStatusDTO), HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<?> updateTaskStatus(@RequestBody TaskStatusDTO taskStatusDTO){
        return new ResponseEntity<>(taskStatusImp.updateTaskStatus(taskStatusDTO), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTaskStatus(@RequestParam int id){
        return new ResponseEntity<>(taskStatusImp.deleteTaskStatus(id), HttpStatus.OK);
    }

}
