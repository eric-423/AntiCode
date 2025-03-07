package com.sba.exam.sba.controller;

import com.sba.exam.sba.entity.Location;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.LocationRequest;
import com.sba.exam.sba.service.imp.LocationServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    LocationServiceImp locationServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllLocation() {
        ResponseData responseData = new ResponseData();
        responseData.setData(locationServiceImp.getAllLocation());
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createLocation(@RequestBody LocationRequest locationRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(locationServiceImp.addLocation(locationRequest));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLocation(@PathVariable int id, @RequestBody LocationRequest locationRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(locationServiceImp.updateLocation(locationRequest, id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLocationById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(locationServiceImp.getLocationById(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAllLocationAvailable(@RequestParam(required = false) Integer locationId){
        try {
            ResponseData responseData = new ResponseData();
            responseData.setData(locationServiceImp.getAllLocationAvailable(locationId));
            responseData.setStatus(200);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(locationServiceImp.deleteLocation(id));
        responseData.setStatus(200);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
