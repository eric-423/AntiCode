package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.PlantMediumRequest;
import com.sba.exam.sba.service.imp.PlantMediumServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plant-medium")
public class PlantMediumController {

    @Autowired
    PlantMediumServiceImp plantMediumServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllPlantMedium() {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantMediumServiceImp.findAllPlantMedium());
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createPlantMedium(@RequestBody PlantMediumRequest plantMediumRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantMediumServiceImp.create(plantMediumRequest));
        responseData.setStatus(201);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantMedium(@PathVariable int id,@RequestBody PlantMediumRequest plantMediumRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantMediumServiceImp.update(plantMediumRequest,id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlantMedium(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantMediumServiceImp.delete(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlantMediumById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(plantMediumServiceImp.findById(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
