package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.PlantDTO;
import com.sba.exam.sba.entity.Plant;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plant")
public class PlantController {

    @Autowired
    PlantService plantService;

    @GetMapping("")
    public ResponseEntity<?> getAllPlant() {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantService.getAllPlant());
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createPlant(@RequestBody PlantDTO plantDTO) {
        boolean isCreated = plantService.addPlant(plantDTO);
        ResponseData responseData = new ResponseData();
        responseData.setData(isCreated ? "Successful" : "Failed");
        responseData.setStatus(isCreated ? 201: 400);
        return new ResponseEntity<>(responseData,isCreated ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("")
    public ResponseEntity<?> updatePlant(@RequestBody PlantDTO plantDTO) {
        boolean isUpdated = plantService.updatePlant(plantDTO);
        ResponseData responseData = new ResponseData();
        responseData.setData(isUpdated ? "Successful" : "Failed");
        responseData.setStatus(isUpdated ? 200 : 400);
        return new ResponseEntity<>(responseData,isUpdated ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deletePlant(@RequestParam List<Integer> listPlantId) {
        boolean isDeleted = plantService.deletePlant(listPlantId);
        ResponseData responseData = new ResponseData();
        responseData.setData(isDeleted ? "Successful" : "Failed");
        responseData.setStatus(isDeleted ? 200 : 400);
        return new ResponseEntity<>(responseData,isDeleted ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
