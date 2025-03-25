package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.request.PlantingProcessRequest;
import com.sba.exam.sba.service.imp.PlantProcessServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/planting-process")
public class PlantingProcess {

    @Autowired
    PlantProcessServiceImp plantProcessServiceImp;

    @PostMapping
    public ResponseEntity<?> createPlantingProcess(@RequestBody PlantingProcessRequest plantProcessRequest) {
        return new ResponseEntity<>(plantProcessServiceImp.createPlantProcess(plantProcessRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantingProcess() {
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getAllPlantingProcesses() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<?> getPlantingProcessByPlantId() {
        return ResponseEntity.ok().build();
    }
}
