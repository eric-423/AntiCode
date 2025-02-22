package com.sba.exam.sba.controller;


import com.sba.exam.sba.service.imp.ChemicalTypeImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/chemical-type")
public class ChemicalType {

    @Autowired
    ChemicalTypeImp chemicalTypeImp;

    @GetMapping("")
    public ResponseEntity<?> getChemicalType() {
        return new ResponseEntity<>( chemicalTypeImp.getAllChemicalType(), HttpStatus.OK);
    }

}
