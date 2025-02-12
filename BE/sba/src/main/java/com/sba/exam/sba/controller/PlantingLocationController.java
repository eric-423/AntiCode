package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.PlantingLocationDTO;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.PlantingLocationRequest;
import com.sba.exam.sba.repository.PlantingLocationRepository;
import com.sba.exam.sba.service.imp.PlantLocationServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planting-location")
public class PlantingLocationController {

    @Autowired
    private PlantingLocationRepository plantingLocationRepository;

    @Autowired
    private PlantLocationServiceImp plantLocationServiceImp;

    @GetMapping
    public ResponseEntity<?> getPlantingLocation() {
        List<PlantingLocationDTO> plantingLocationDTOS = plantLocationServiceImp.getPlantLocationList();
        ResponseData responseData = new ResponseData();
        responseData.setData(plantingLocationDTOS);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createPlantingLocation(@RequestBody PlantingLocationRequest plantingLocationRequest) {
        PlantingLocationDTO plantingLocationDTO = plantLocationServiceImp.addPlantLocation(plantingLocationRequest);

        if(plantingLocationDTO==null){
            return new ResponseEntity<>("",HttpStatus.INTERNAL_SERVER_ERROR);
        } else{
            ResponseData responseData = new ResponseData();
            responseData.setData(plantingLocationDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantingLocation(@PathVariable int id, @RequestBody PlantingLocationRequest plantingLocationRequest) {
        PlantingLocationDTO plantingLocationDTO = plantLocationServiceImp.updatePlantLocation(id, plantingLocationRequest);

        System.out.println(plantingLocationRequest.toString());
        if(plantingLocationDTO==null){
            return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
        } else{
            ResponseData responseData = new ResponseData();
            responseData.setData(plantingLocationDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlantingLocation(@PathVariable int id) {
        PlantingLocationDTO plantingLocationDTO = plantLocationServiceImp.deletePlantLocation(id);

        if(plantingLocationDTO==null){
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            ResponseData responseData = new ResponseData();
            responseData.setData(plantingLocationDTO);
            return new ResponseEntity<>(responseData,HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlantingLocationById(@PathVariable int id) {
        PlantingLocationDTO plantingLocationDTO = plantLocationServiceImp.getPlantLocationById(id);

        if(plantingLocationDTO==null){
            return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
        } else{
            ResponseData responseData = new ResponseData();
            responseData.setData(plantingLocationDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
    }
}
