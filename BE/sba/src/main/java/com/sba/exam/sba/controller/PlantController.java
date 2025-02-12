package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plant")
public class PlantController {

    @Autowired
    PlantService plantService;

    @GetMapping()
    public ResponseEntity<?> getAllPlant() {

        ResponseData responseData = new ResponseData();
        responseData.setData(plantService.getAllPlant());
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

}
