package com.sba.exam.sba.controller;


import com.sba.exam.sba.dto.EquipmentTypeDTO;
import com.sba.exam.sba.service.imp.EquipmentTypeImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/equipment-type")
public class EquipmentTypeController {

    @Autowired
    EquipmentTypeImp equipmentTypeImp;


    @GetMapping("/")
    public ResponseEntity<?> getAllEquipmentType() {
        try {
            return ResponseEntity.ok(equipmentTypeImp.getAllEquipmentType());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Cannot get equipment type list");
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewEquipmentType(@RequestBody EquipmentTypeDTO equipmentTypeDTO) {
        try {
            return ResponseEntity.ok(equipmentTypeImp.addNewEquipmentType(equipmentTypeDTO));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Cannot add new equipment type");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEquipmentType(@RequestBody EquipmentTypeDTO equipmentTypeDTO, @PathVariable int id) {
        try {
            return ResponseEntity.ok(equipmentTypeImp.updateEquipmentType(equipmentTypeDTO, id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Cannot update equipment type");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEquipmentType(@PathVariable int id) {
        try {
            return ResponseEntity.ok(equipmentTypeImp.deleteEquipmentType(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Cannot delete equipment type");
    }

}
