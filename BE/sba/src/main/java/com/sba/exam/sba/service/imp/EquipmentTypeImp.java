package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.EquipmentTypeDTO;

import java.util.List;

public interface EquipmentTypeImp {

    List<EquipmentTypeDTO> getAllEquipmentType();

    EquipmentTypeDTO addNewEquipmentType(EquipmentTypeDTO equipmentTypeDTO);

    EquipmentTypeDTO updateEquipmentType(EquipmentTypeDTO equipmentTypeDTO, int id);

    EquipmentTypeDTO deleteEquipmentType(int id);

}
