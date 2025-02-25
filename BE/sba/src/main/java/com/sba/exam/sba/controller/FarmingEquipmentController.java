package com.sba.exam.sba.controller;


import com.sba.exam.sba.dto.FarmingEquipmentDTO;
import com.sba.exam.sba.service.imp.FarmingEquipmentServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/farming-equipment")
public class FarmingEquipmentController {

    @Autowired
    FarmingEquipmentServiceImp farmingEquipmentServiceImp;

    @GetMapping("/")
    public ResponseEntity<?> getFarmingEquipments() {
        try {
            return ResponseEntity.ok(farmingEquipmentServiceImp.getFarmingEquipments());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error in fetching farming equipments");
    }

    @PostMapping("/{typeId}")
    public ResponseEntity<?> addFarmingEquipment(@RequestBody FarmingEquipmentDTO farmingEquipmentDTO, @PathVariable int typeId) {
        try {
            return ResponseEntity.ok(farmingEquipmentServiceImp.addFarmingEquipment(farmingEquipmentDTO, typeId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error in adding farming equipment");
    }

    @PutMapping("/{typeId}")
    public ResponseEntity<?> updateFarmingEquipment(@PathVariable int typeId, @RequestBody FarmingEquipmentDTO farmingEquipmentDTO) {
        try {
            return ResponseEntity.ok(farmingEquipmentServiceImp.updateFarmingEquipment(farmingEquipmentDTO, typeId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error in updating farming equipment");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFarmingEquipment(@PathVariable int id) {
        try {
            return ResponseEntity.ok(farmingEquipmentServiceImp.deleteFarmingEquipment(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error in deleting farming equipment");
    }
}
