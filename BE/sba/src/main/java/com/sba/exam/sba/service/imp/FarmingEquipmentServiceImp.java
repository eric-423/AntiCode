package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.FarmingEquipmentDTO;

import java.util.List;

public interface FarmingEquipmentServiceImp {
    FarmingEquipmentDTO addFarmingEquipment(FarmingEquipmentDTO dto, int typeId);

    FarmingEquipmentDTO updateFarmingEquipment(FarmingEquipmentDTO dto, int typeId);

    FarmingEquipmentDTO deleteFarmingEquipment(int equipmentId);

    List<FarmingEquipmentDTO> getFarmingEquipments();
}
