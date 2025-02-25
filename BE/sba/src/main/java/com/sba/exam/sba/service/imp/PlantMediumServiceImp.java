package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.PlantMediumDTO;
import com.sba.exam.sba.payload.request.PlantMediumRequest;

import java.util.List;

public interface PlantMediumServiceImp {
    List<PlantMediumDTO> findAllPlantMedium();
    PlantMediumDTO findById(int id);
    PlantMediumDTO update(PlantMediumRequest plantMediumRequest, int id);
    PlantMediumDTO create(PlantMediumRequest plantMediumRequest);
    PlantMediumDTO delete(int id);
}
