package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.PlantTypeDTO;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.service.imp.PlantTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/plant-type")
public class PlantTypeController {

    @Autowired
    private PlantTypeServiceImp plantTypeService;

    @GetMapping("")
    public ResponseEntity<?> getAllPlantTypes() {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantTypeService.getAllPlantTypes());
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createPlantType(@RequestBody PlantTypeDTO plantTypeDTO) {
        boolean isCreated = plantTypeService.createPlantType(plantTypeDTO);
        ResponseData responseData = new ResponseData();
        responseData.setData(isCreated ? "Successful" : "Failed");
        responseData.setStatus(isCreated ? 201 : 400);
        return new ResponseEntity<>(responseData,isCreated ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("")
    public ResponseEntity<?> updatePlantType(@RequestBody PlantTypeDTO plantTypeDTO) {
        boolean isUpdated = plantTypeService.updatePlantType(plantTypeDTO);
        ResponseData responseData = new ResponseData();
        responseData.setData(isUpdated ? "Successful" : "Failed");
        responseData.setStatus(isUpdated ? 200 : 400);
        return new ResponseEntity<>(responseData,isUpdated ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deletePlantType(@RequestParam Integer plantTypeId) {
        boolean isDeleted = plantTypeService.deletePlantType(plantTypeId);
        ResponseData responseData = new ResponseData();
        responseData.setData(isDeleted ? "Successful" : "Failed");
        responseData.setStatus(isDeleted ? 200 : 400);
        return new ResponseEntity<>(responseData,isDeleted ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
