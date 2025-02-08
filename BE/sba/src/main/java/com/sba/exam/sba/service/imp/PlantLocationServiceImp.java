package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.PlantingLocationDTO;
import com.sba.exam.sba.payload.request.PlantingLocationRequest;

import java.util.List;

public interface PlantLocationServiceImp {
    public List<PlantingLocationDTO> getPlantLocationList();
    public PlantingLocationDTO getPlantLocationById(int id);
    public PlantingLocationDTO addPlantLocation(PlantingLocationRequest plantLocationRequest);
    public PlantingLocationDTO updatePlantLocation(int id, PlantingLocationRequest plantLocationRequest);
    public PlantingLocationDTO deletePlantLocation(int id);
}
