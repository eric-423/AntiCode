package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.TaskRequest;
import com.sba.exam.sba.service.TaskService;
import com.sba.exam.sba.service.imp.TaskServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    TaskServiceImp taskServiceImp;

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
        return new ResponseEntity<>(taskServiceImp.addTask(taskRequest), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<?> updateTask(@RequestBody TaskRequest taskRequest) {
        return new ResponseEntity<>(taskServiceImp.updateTask(taskRequest), HttpStatus.OK);
    }
}
