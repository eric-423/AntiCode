package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.PlantDTO;

import java.util.List;

public interface PlantServiceImp {
     List<PlantDTO> getAllPlant();
     boolean addPlant(PlantDTO plantDTO);
     boolean updatePlant(PlantDTO plantDTO);
     boolean deletePlant(List<Integer> listPlantId);
}
