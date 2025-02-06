package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlantingLocationDTO;
import com.sba.exam.sba.entity.Area;
import com.sba.exam.sba.entity.Plant;
import com.sba.exam.sba.entity.PlantingLocation;
import com.sba.exam.sba.payload.request.PlantingLocationRequest;
import com.sba.exam.sba.repository.PlantingLocationRepository;
import com.sba.exam.sba.service.imp.PlantLocationServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlantingLocationService implements PlantLocationServiceImp {

    @Autowired
    PlantingLocationRepository plantingLocationRepository;

    @Override
    public List<PlantingLocationDTO> getPlantLocationList() {
        List<PlantingLocation> plantingLocationList = plantingLocationRepository.findAll();
        List<PlantingLocationDTO> result = new ArrayList<>();

        for(PlantingLocation plantingLocation : plantingLocationList){
            PlantingLocationDTO plantingLocationDTO = getPlantLocationById(plantingLocation.getPlantLocationId());
            result.add(plantingLocationDTO);
        }
        return result;
    }

    @Override
    public PlantingLocationDTO getPlantLocationById(int id) {
        PlantingLocation plantingLocation = plantingLocationRepository.findByPlantLocationId(id);

        if(plantingLocation==null){
            return null;
        } else{
            Plant plant = plantingLocation.getPlant();
            Area area = plantingLocation.getArea();

            PlantingLocationDTO plantingLocationDTO = new PlantingLocationDTO();
            plantingLocationDTO.setPlantingLocationId(plantingLocation.getPlantLocationId());
            plantingLocationDTO.setPlantId(plant.getPlantId());
            plantingLocationDTO.setPlantName(plant.getPlantName());
            plantingLocationDTO.setAreaId(area.getAreaId());
            plantingLocationDTO.setAreaName(area.getAreaName());
            plantingLocationDTO.setLocationSize(plantingLocation.getLocationSize());
            plantingLocationDTO.setLocationName(plantingLocation.getLocationName());
            plantingLocationDTO.setStartDate(plantingLocation.getStartDate());
            plantingLocationDTO.setEndDate(plantingLocation.getEndDate());
            plantingLocationDTO.setHarvest(plantingLocation.isHarvest());

            return plantingLocationDTO;
        }
    }

    @Override
    public PlantingLocationDTO addPlantLocation(PlantingLocationRequest plantLocationRequest) {

        return null;
    }

    @Override
    public PlantingLocationDTO updatePlantLocation(int id, PlantingLocationRequest plantLocationRequest) {
        return null;
    }

    @Override
    public PlantingLocationDTO deletePlantLocation(int id) {
        return null;
    }
}
