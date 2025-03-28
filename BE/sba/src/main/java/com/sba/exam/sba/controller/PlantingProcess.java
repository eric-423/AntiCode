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
    private PlantProcessServiceImp plantProcessServiceImp;

    @Autowired
    PlantProcessServiceImp plantProcessServiceImp;

    @PostMapping

    public ResponseEntity<?> createPlantingProcess(@RequestBody PlantingProcessRequest plantingProcessRequest) {
        return new ResponseEntity<>(plantProcessServiceImp.createPlantProcess(plantingProcessRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantingProcess(@RequestBody PlantingProcessRequest plantingProcessRequest, @PathVariable int id) {
        plantProcessServiceImp.updatePlantProcess(id,plantingProcessRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getAllPlantingProcesses(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(plantProcessServiceImp.getAllPlantProcesses(page, size), HttpStatus.OK);
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<?> getPlantingProcessByPlantId(@PathVariable int plantId) {
        return new ResponseEntity<>(plantProcessServiceImp.getPlantProcessById(plantId), HttpStatus.OK);
    }
}
