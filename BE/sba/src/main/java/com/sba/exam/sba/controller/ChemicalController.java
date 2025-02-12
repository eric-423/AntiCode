package com.sba.exam.sba.controller;


import com.sba.exam.sba.dto.ChemicalDTO;
import com.sba.exam.sba.service.imp.ChemicalServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/chemical")
public class ChemicalController {
    @Autowired
    ChemicalServiceImp chemicalServiceImp;

    @GetMapping("")
    public ResponseEntity<?> getAllData() {
        return new ResponseEntity<>(chemicalServiceImp.findAll(), org.springframework.http.HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteData(@PathVariable int id) {
        return new ResponseEntity<>(chemicalServiceImp.delete(id), HttpStatus.OK);
    }

    @PostMapping("/{typeId}")
    @Transactional
    public ResponseEntity<?> createChemical(@RequestBody ChemicalDTO dto, @PathVariable int typeId) {
        try {
            return new ResponseEntity<>(chemicalServiceImp.createChemical(dto, typeId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{typeId}")
    @Transactional
    public ResponseEntity<?> updateChemical(@RequestBody ChemicalDTO dto, @PathVariable int typeId) {
        try {
            return new ResponseEntity<>(chemicalServiceImp.updateChemical(dto, typeId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
