package com.sba.exam.sba.controller;

import com.sba.exam.sba.dto.PlansDTO;
import com.sba.exam.sba.service.imp.PlantLocationServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/plans")
public class PlansController {

    @Autowired
    private PlantLocationServiceImp plantLocationServiceImp;

    @GetMapping()
    public ResponseEntity<List<PlansDTO>> getAllPlans() {
        return new ResponseEntity<>(plantLocationServiceImp.getAllPlans(), HttpStatus.OK);
    }

    @GetMapping("/plant-id")
    public ResponseEntity<PlansDTO> getPlansByPlan(@Param("id") long plan){
        return new ResponseEntity<>(plantLocationServiceImp.getByPlans(plan), HttpStatus.OK);
    }

}
