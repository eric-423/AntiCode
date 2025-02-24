package com.sba.exam.sba.service;


import com.sba.exam.sba.dto.EquipmentTypeDTO;
import com.sba.exam.sba.entity.EquipmentType;
import com.sba.exam.sba.repository.EquipmentTypeRepository;
import com.sba.exam.sba.service.imp.EquipmentTypeImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipmentTypeService implements EquipmentTypeImp {


    @Autowired
    EquipmentTypeRepository equipmentTypeRepository;


    @Override
    public List<EquipmentTypeDTO> getAllEquipmentType() {
        List<EquipmentTypeDTO> dtos = new ArrayList<>();

        try {
            List<EquipmentType> list = equipmentTypeRepository.findAll();
            for (EquipmentType equipmentType : list) {
                EquipmentTypeDTO equipmentTypeDTO = new EquipmentTypeDTO();

                equipmentTypeDTO.setId(equipmentType.getId());
                equipmentTypeDTO.setName(equipmentType.getName());
                equipmentTypeDTO.setDescription(equipmentType.getDescription());
                equipmentTypeDTO.setDeleted(equipmentType.isDeleted());
                dtos.add(equipmentTypeDTO);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return dtos;
    }

    @Transactional
    @Override
    public EquipmentTypeDTO addNewEquipmentType(EquipmentTypeDTO equipmentTypeDTO) {

        try {

            EquipmentType equipmentType = new EquipmentType();
            equipmentType.setName(equipmentTypeDTO.getName());
            equipmentType.setDescription(equipmentTypeDTO.getDescription());
            equipmentType.setDeleted(false);
            equipmentTypeRepository.save(equipmentType);
            equipmentTypeDTO.setId(equipmentType.getId());
            return equipmentTypeDTO;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return equipmentTypeDTO;
    }

    @Override
    @Transactional
    public EquipmentTypeDTO updateEquipmentType(EquipmentTypeDTO equipmentTypeDTO, int id) {
        try {
            EquipmentType equipmentType = equipmentTypeRepository.findById(id).orElseThrow(() -> new Exception("Equipment Type not found"));
            equipmentType.setName(equipmentTypeDTO.getName());
            equipmentType.setDescription(equipmentTypeDTO.getDescription());
            equipmentType.setDeleted(equipmentTypeDTO.isDeleted());
            equipmentTypeRepository.save(equipmentType);
            equipmentTypeDTO.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return equipmentTypeDTO;
    }


    @Override
    public EquipmentTypeDTO deleteEquipmentType(int id) {
        EquipmentTypeDTO dto = new EquipmentTypeDTO();
        try {
            EquipmentType equipmentType = equipmentTypeRepository.findById(id).orElseThrow(() -> new Exception("Equipment Type not found"));
            equipmentType.setDeleted(true);
            equipmentTypeRepository.save(equipmentType);

            dto.setId(equipmentType.getId());
            dto.setName(equipmentType.getName());
            dto.setDescription(equipmentType.getDescription());
            dto.setDeleted(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dto;
    }

}
