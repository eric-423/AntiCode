package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.AreaDTO;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.AreaRequest;
import com.sba.exam.sba.service.imp.AreaServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/area")
public class AreaController {

    @Autowired
    AreaServiceImp areaServiceImp;

    @GetMapping
    public ResponseEntity<?>getAllArea(){
        ResponseData responseData = new ResponseData();
        responseData.setData(areaServiceImp.getALlArea());
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?>getAllAreaById(@PathVariable("id") int id){
        ResponseData responseData = new ResponseData();
        AreaDTO areaDTO = areaServiceImp.getAreaById(id);
        if(areaDTO == null){
            responseData.setData("Area not found");
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
        responseData.setData(areaDTO);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?>createArea(@RequestBody AreaRequest areaRequest){
        ResponseData responseData = new ResponseData();

        float width = areaRequest.getAreaWidth();
        float length =areaRequest.getAreaLength();
        float extent = areaRequest.getAreaExtend();

        if(width<0||length<0||extent<0){
            responseData.setData("Width, length and extent must be greater than 0");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

        if (width * length > extent) {
            responseData.setData("Extent must be greater than width * length");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

        AreaDTO areaDTO = areaServiceImp.createArea(areaRequest);
        if(areaDTO == null){
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
        responseData.setData(areaDTO);
        return new ResponseEntity<>(responseData, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>DeleteArea(@PathVariable("id") int id){
        ResponseData responseData = new ResponseData();
        AreaDTO areaDTO = areaServiceImp.deleteArea(id);
        if(areaDTO == null){
            responseData.setData("Area Bug");
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>UpdateArea(@RequestBody AreaRequest areaRequest, @PathVariable("id") int id){
        ResponseData responseData = new ResponseData();

        float width = areaRequest.getAreaWidth();
        float length =areaRequest.getAreaLength();
        float extent = areaRequest.getAreaExtend();

        if(width<0||length<0||extent<0){
            responseData.setData("Width, length and extent must be greater than 0");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

        if (width * length > extent) {
            responseData.setData("Extent must be greater than width * length");
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }

        AreaDTO areaDTO = areaServiceImp.updateArea(areaRequest,id);
        if(areaDTO == null){
            responseData.setData("Area Bug");
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<?> getAreaByFarm_FarmId(@PathVariable int id){
        return new ResponseEntity<>(areaServiceImp.getAreaByFarm_FarmId(id), HttpStatus.OK);
    }
}
