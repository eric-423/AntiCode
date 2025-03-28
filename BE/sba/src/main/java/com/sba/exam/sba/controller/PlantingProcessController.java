package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.PlantingProcessDTO;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.PlantingProcessRequest;
import com.sba.exam.sba.service.imp.PlantProcessServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/planting-process-v2")
public class PlantingProcessController {

    @Autowired
    private PlantProcessServiceImp plantProcessServiceImp;

    @PostMapping
    public ResponseEntity<?> createPlantingProcess(@RequestBody PlantingProcessRequest plantingProcessRequest) {
        PlantingProcessDTO plantingProcessDTO = plantProcessServiceImp.createPlantProcess(plantingProcessRequest);
        ResponseData responseData = new ResponseData();
        responseData.setData(plantingProcessDTO);
        return new ResponseEntity<>(responseData, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantingProcess(@PathVariable int id, @RequestBody PlantingProcessRequest plantingProcessRequest) {
        PlantingProcessDTO plantingProcessDTO = plantProcessServiceImp.updatePlantProcess(id, plantingProcessRequest);
        ResponseData responseData = new ResponseData();
        responseData.setData(plantingProcessDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllPlantingProcesses(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        Page<PlantingProcessDTO> plantingProcessDTO = plantProcessServiceImp.getAllPlantProcesses(page, size);
        ResponseData responseData = new ResponseData();
        responseData.setData(plantingProcessDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }

    @GetMapping("/plant/{id}")
    public ResponseEntity<?> getPlantingProcessByPlantId(@PathVariable int id) {
        PlantingProcessDTO plantingProcessDTO = plantProcessServiceImp.getPlantProcessById(id);
        ResponseData responseData = new ResponseData();
        responseData.setData(plantingProcessDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }
}
