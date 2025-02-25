package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.PlantPotDTO;
import com.sba.exam.sba.payload.request.PlantPotRequest;

import java.util.List;

public interface PlantPotServiceImp {

    List<PlantPotDTO> findAllPlantPot();

    PlantPotDTO findById(int id);

    PlantPotDTO update(PlantPotRequest plantPotRequest, int id);

    PlantPotDTO create(PlantPotRequest plantPotRequest);

    PlantPotDTO delete(int id);

}
