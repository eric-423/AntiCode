package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.FarmRequest;
import com.sba.exam.sba.service.imp.FarmServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/farm")
public class FarmController {

    @Autowired
    FarmServiceImp farmServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllFarm() {
        ResponseData responseData = new ResponseData();
        responseData.setData(farmServiceImp.getFarmList());
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createFarm(@RequestBody FarmRequest farmRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(farmServiceImp.addFarm(farmRequest));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFarmById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(farmServiceImp.getFarmById(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFarm(@PathVariable int id,@RequestBody FarmRequest farmRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(farmServiceImp.updateFarm(farmRequest, id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFarm(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(farmServiceImp.deleteFarm(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
