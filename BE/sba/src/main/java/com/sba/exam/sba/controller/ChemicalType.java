package com.sba.exam.sba.controller;


import com.sba.exam.sba.dto.ChemicalTypeDTO;
import com.sba.exam.sba.service.imp.ChemicalTypeImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/chemical-type")
public class ChemicalType {

    @Autowired
    ChemicalTypeImp chemicalTypeImp;

    @GetMapping("")
    public ResponseEntity<?> getChemicalType() {
        return new ResponseEntity<>(chemicalTypeImp.getAllChemicalType(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createChemicalType(@RequestBody ChemicalTypeDTO dto) {
        return new ResponseEntity<>(chemicalTypeImp.createChemicalType(dto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChemicalType(@PathVariable int id) {
        return new ResponseEntity<>(chemicalTypeImp.deleteChemicalType(id), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<?> updateChemicalType(@RequestBody ChemicalTypeDTO dto) {
        return new ResponseEntity<>(chemicalTypeImp.updateChemicalType( dto), HttpStatus.OK);
    }

}
