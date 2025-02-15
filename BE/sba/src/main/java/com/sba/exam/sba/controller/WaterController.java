package com.sba.exam.sba.controller;

import com.sba.exam.sba.entity.Water;
import com.sba.exam.sba.payload.WaterRequest;
import com.sba.exam.sba.repository.WaterRepository;
import com.sba.exam.sba.service.imp.WaterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/water")
public class WaterController {

    @Autowired
    WaterServiceImp waterServiceImp;

    @PostMapping("/addWater")
    public ResponseEntity<?> addWater(@RequestBody WaterRequest water) {
        waterServiceImp.addWater(water);
        return new ResponseEntity<>(water, HttpStatus.OK);
    }

    @GetMapping("/getWaters")
    public ResponseEntity<?> getAllWater() {
        return new ResponseEntity<>(waterServiceImp.getWaterList(), HttpStatus.OK);
    }

    @GetMapping("/getWater/{id}")
    public ResponseEntity<?> getWaterById(@PathVariable int id) {
        return new ResponseEntity<>(waterServiceImp.getWaterById(id), HttpStatus.OK);
    }

    @PostMapping("/updateWater")
    public ResponseEntity<?> updateWater(@RequestBody WaterRequest water) {
        waterServiceImp.updateWater(water);
        return new ResponseEntity<>(water, HttpStatus.OK);
    }

}
