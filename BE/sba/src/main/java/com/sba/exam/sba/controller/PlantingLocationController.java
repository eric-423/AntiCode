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

import java.util.Date;
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
        ResponseData responseData = new ResponseData();
        if(plantingLocationRequest.getStartDate().before(new Date())){
            responseData.setData("Start date must be after current date");
            return new ResponseEntity<>(new ResponseData(), HttpStatus.BAD_REQUEST);
        } else if(plantingLocationRequest.getEndDate().before(plantingLocationRequest.getStartDate())){
            responseData.setData("End date must be after start date");
            return new ResponseEntity<>(new ResponseData(), HttpStatus.BAD_REQUEST);
        }
        PlantingLocationDTO plantingLocationDTO = plantLocationServiceImp.addPlantLocation(plantingLocationRequest);
        responseData.setData(plantingLocationDTO);
        return new ResponseEntity<>(responseData, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantingLocation(@PathVariable int id, @RequestBody PlantingLocationRequest plantingLocationRequest) {

        ResponseData responseData = new ResponseData();
        System.out.println(plantingLocationRequest.getStartDate());
        System.out.println(new Date());
        if(plantingLocationRequest.getStartDate().before(new Date())){
            responseData.setData("Start date must be after current date");
            return new ResponseEntity<>(new ResponseData(), HttpStatus.BAD_REQUEST);
        } else if(plantingLocationRequest.getEndDate().before(plantingLocationRequest.getStartDate())){
            responseData.setData("End date must be after start date");
            return new ResponseEntity<>(new ResponseData(), HttpStatus.BAD_REQUEST);
        }

        PlantingLocationDTO plantingLocationDTO = plantLocationServiceImp.updatePlantLocation(id, plantingLocationRequest);

        if(plantingLocationDTO==null){
            return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
        } else{
            responseData.setData(plantingLocationDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlantingLocation(@PathVariable int id) {
        PlantingLocationDTO plantingLocationDTO = plantLocationServiceImp.deletePlantLocation(id);

        if(plantingLocationRepository.findByPlantLocationId(id)==null){
            return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
        } else{
            ResponseData responseData = new ResponseData();
            responseData.setData(plantingLocationDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
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
