package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.TaskTypeDTO;
import com.sba.exam.sba.service.imp.TaskTypeImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task-type")
public class TaskTypeController {

    @Autowired
    private TaskTypeImp taskTypeImp;

    @GetMapping
    public ResponseEntity<?> getAllTaskTypes() {
        return new ResponseEntity<>(taskTypeImp.getAllTaskTypes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskTypeById(@PathVariable int id) {
        return new ResponseEntity<>(taskTypeImp.getTaskTypeById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addTaskType(@RequestBody TaskTypeDTO taskTypeDTO) {
        return new ResponseEntity<>(taskTypeImp.addTaskType(taskTypeDTO), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateTaskType(@RequestBody TaskTypeDTO taskTypeDTO) {
        return new ResponseEntity<>(taskTypeImp.updateTaskType(taskTypeDTO), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTaskType(@RequestParam int id) {
        return new ResponseEntity<>(taskTypeImp.deleteTaskType(id), HttpStatus.OK);
    }
}
