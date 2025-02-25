package com.sba.exam.sba.controller;


import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.PlantPotRequest;
import com.sba.exam.sba.service.imp.PlantPotServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plant-pot")
public class PlantPotController {

    @Autowired
    PlantPotServiceImp plantPotServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllPlantPot() {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantPotServiceImp.findAllPlantPot());
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createPlantPot(@RequestBody PlantPotRequest plantPotRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantPotServiceImp.create(plantPotRequest));
        responseData.setStatus(201);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlantPotById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantPotServiceImp.findById(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantPot(@PathVariable int id,@RequestBody PlantPotRequest plantPotRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantPotServiceImp.update(plantPotRequest,id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlantPot(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantPotServiceImp.delete(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
