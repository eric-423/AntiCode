package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.FarmingEquipmentDTO;
import com.sba.exam.sba.entity.EquipmentType;
import com.sba.exam.sba.entity.FarmingEquipment;
import com.sba.exam.sba.repository.EquipmentTypeRepository;
import com.sba.exam.sba.repository.FarmingEquipmentRepository;
import com.sba.exam.sba.service.imp.FarmingEquipmentServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class FarmingEquipmentService implements FarmingEquipmentServiceImp {


    @Autowired
    FarmingEquipmentRepository farmingEquipmentRepository;

    @Autowired
    EquipmentTypeRepository equipmentTypeRepository;


    @Override
    @Transactional
    public FarmingEquipmentDTO addFarmingEquipment(FarmingEquipmentDTO dto, int typeId) {
        try {
            EquipmentType equipmentType = equipmentTypeRepository.findById(typeId).orElseThrow(() -> new RuntimeException("Equipment Type not found"));

            FarmingEquipment farmingEquipment = new FarmingEquipment();
            farmingEquipment.setName(dto.getName());
            farmingEquipment.setDescription(dto.getDescription());
            farmingEquipment.setQuantity(dto.getQuantity());
            farmingEquipment.setInUsed(false);
            farmingEquipment.setDamaged(false);
            farmingEquipment.setDeleted(false);

            farmingEquipment.setEquipmentType(equipmentType);
            dto.setTypeName(equipmentType.getName());
            farmingEquipmentRepository.save(farmingEquipment);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return dto;
    }

    @Override
    @Transactional
    public FarmingEquipmentDTO updateFarmingEquipment(FarmingEquipmentDTO dto, int typeId) {
        try {
            EquipmentType equipmentType = equipmentTypeRepository.findById(typeId).orElseThrow(() -> new RuntimeException("Equipment Type not found"));

            FarmingEquipment farmingEquipment = farmingEquipmentRepository.findById(dto.getId()).orElseThrow(() -> new RuntimeException("Farming Equipment not found"));

            farmingEquipment.setName(dto.getName());
            farmingEquipment.setDescription(dto.getDescription());
            farmingEquipment.setQuantity(dto.getQuantity());
            farmingEquipment.setInUsed(dto.isInUsed());
            farmingEquipment.setDamaged(dto.isDamaged());
            farmingEquipment.setEquipmentType(equipmentType);
            farmingEquipment.setDeleted(dto.isDeleted());

            dto.setTypeName(equipmentType.getName());

            farmingEquipmentRepository.save(farmingEquipment);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dto;
    }

    @Override
    public FarmingEquipmentDTO deleteFarmingEquipment(int equipmentId) {
        FarmingEquipmentDTO dto = new FarmingEquipmentDTO();
        try {
            FarmingEquipment farmingEquipment = farmingEquipmentRepository.findById(equipmentId).orElseThrow();
            farmingEquipment.setDeleted(true);

            farmingEquipmentRepository.save(farmingEquipment);

            dto.setId(farmingEquipment.getId());
            dto.setName(farmingEquipment.getName());
            dto.setDescription(farmingEquipment.getDescription());
            dto.setQuantity(farmingEquipment.getQuantity());
            dto.setInUsed(farmingEquipment.isInUsed());
            dto.setDamaged(farmingEquipment.isDamaged());
            dto.setDeleted(farmingEquipment.isDeleted());
            dto.setTypeName(farmingEquipment.getEquipmentType().getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dto;
    }

    @Override
    public List<FarmingEquipmentDTO> getFarmingEquipments() {
        List<FarmingEquipmentDTO> farmingEquipmentDTOList = new ArrayList<>();
        try {
            List<FarmingEquipment> farmingEquipments = farmingEquipmentRepository.findAll();
            for (FarmingEquipment farmingEquipment : farmingEquipments) {
                FarmingEquipmentDTO farmingEquipmentDTO = new FarmingEquipmentDTO();
                farmingEquipmentDTO.setId(farmingEquipment.getId());
                farmingEquipmentDTO.setName(farmingEquipment.getName());
                farmingEquipmentDTO.setDescription(farmingEquipment.getDescription());
                farmingEquipmentDTO.setQuantity(farmingEquipment.getQuantity());
                farmingEquipmentDTO.setInUsed(farmingEquipment.isInUsed());
                farmingEquipmentDTO.setDamaged(farmingEquipment.isDamaged());
                farmingEquipmentDTO.setDeleted(farmingEquipment.isDeleted());
                farmingEquipmentDTO.setTypeName(farmingEquipment.getEquipmentType().getName());
                farmingEquipmentDTOList.add(farmingEquipmentDTO);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return farmingEquipmentDTOList;
    }
}

