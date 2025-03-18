package com.sba.exam.sba.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/planting-process")
public class PlantingProcess {

    @PostMapping
    public ResponseEntity<?> createPlantingProcess() {
        return ResponseEntity.ok().build();
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
