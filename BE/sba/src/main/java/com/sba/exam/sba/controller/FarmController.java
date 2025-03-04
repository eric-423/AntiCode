package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.FarmRequest;
import com.sba.exam.sba.service.imp.FarmServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

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
        float width = farmRequest.getFarmWidth();
        float length = farmRequest.getFarmLength();
        float extent = farmRequest.getFarmExtend();

        if(width<0||length<0||extent<0){
            ResponseData responseData = new ResponseData();
            responseData.setData("Width, length and extent must be greater than 0");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

        if (width * length > extent) {
            ResponseData responseData = new ResponseData();
            responseData.setData("Extent must be greater than width * length");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
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

        float width = farmRequest.getFarmWidth();
        float length = farmRequest.getFarmLength();
        float extent = farmRequest.getFarmExtend();

        if(width<0||length<0||extent<0){
            ResponseData responseData = new ResponseData();
            responseData.setData("Width, length and extent must be greater than 0");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

        if (width * length > extent) {
            ResponseData responseData = new ResponseData();
            responseData.setData("Extent must be greater than width * length");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

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
