package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlantingLocationDTO;
import com.sba.exam.sba.entity.Area;
import com.sba.exam.sba.entity.Location;
import com.sba.exam.sba.entity.Plant;
import com.sba.exam.sba.entity.PlantingLocation;
import com.sba.exam.sba.payload.request.PlantingLocationRequest;
import com.sba.exam.sba.repository.AreaRepository;
import com.sba.exam.sba.repository.LocationRepository;
import com.sba.exam.sba.repository.PlantRepository;
import com.sba.exam.sba.repository.PlantingLocationRepository;
import com.sba.exam.sba.service.imp.PlantLocationServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PlantingLocationService implements PlantLocationServiceImp {

    @Autowired
    PlantingLocationRepository plantingLocationRepository;

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    AreaRepository areaRepository;

    @Autowired
    LocationRepository locationRepository;

    @Override
    public List<PlantingLocationDTO> getPlantLocationList() {
        List<PlantingLocation> plantingLocationList = plantingLocationRepository.findByIsDeleted(false);
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
            Location location = plantingLocation.getLocation();

            PlantingLocationDTO plantingLocationDTO = new PlantingLocationDTO();
            plantingLocationDTO.setPlantingLocationId(plantingLocation.getPlantLocationId());
            plantingLocationDTO.setPlantId(plant.getPlantId());
            plantingLocationDTO.setPlantName(plant.getPlantName());
            plantingLocationDTO.setPlantPrice(plant.getPrice());
            plantingLocationDTO.setPlantSize(plant.getSize());
            plantingLocationDTO.setSeed(plant.isSeed());
            plantingLocationDTO.setPlantSpecies(plant.getSpecies());
            plantingLocationDTO.setPlantDescription(plant.getDescription());
            plantingLocationDTO.setPlantCharacteristics(plant.getCharacteristics());
            plantingLocationDTO.setPlantAttracts(plant.getAttracts());
            plantingLocationDTO.setPlantHardiness(plant.getHardiness());
            plantingLocationDTO.setPlantHeatZones(plant.getHeatZones());
            plantingLocationDTO.setLocationId(location.getLocationId());
            plantingLocationDTO.setLocationName(location.getLocationName());
            plantingLocationDTO.setLocationExtent(location.getLocationExtent());
            plantingLocationDTO.setStartDate(plantingLocation.getStartDate());
            plantingLocationDTO.setEndDate(plantingLocation.getEndDate());
            plantingLocationDTO.setHarvest(plantingLocation.isHarvest());

            return plantingLocationDTO;
        }
    }

    @Override
    @Transactional
    public PlantingLocationDTO addPlantLocation(PlantingLocationRequest plantLocationRequest) {
        try {

            PlantingLocation plantingLocation = new PlantingLocation();
            Plant plant = plantRepository.findByPlantId(plantLocationRequest.getPlantId());
            Location location = locationRepository.findByLocationId(plantLocationRequest.getLocationId());
            plantingLocation.setPlant(plant);
            plantingLocation.setLocation(location);
            plantingLocation.setStartDate(new Date());
            plantingLocation.setEndDate(plantLocationRequest.getEndDate());
            plantingLocation.setHarvest(false);
            plantingLocation.setDeleted(false);
            plantingLocationRepository.save(plantingLocation);

            return getPlantLocationById(plantingLocation.getPlantLocationId());
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public PlantingLocationDTO updatePlantLocation(int id, PlantingLocationRequest plantLocationRequest) {
        try {
            PlantingLocation plantingLocation = plantingLocationRepository.findByPlantLocationId(id);
            Plant plant = plantRepository.findByPlantId(plantLocationRequest.getPlantId());
            Location location = locationRepository.findByLocationId(plantLocationRequest.getLocationId());

            plantingLocation.setPlant(plant);
            plantingLocation.setLocation(location);
            plantingLocation.setStartDate(plantLocationRequest.getStartDate());
            plantingLocation.setEndDate(plantLocationRequest.getEndDate());
            plantingLocation.setHarvest(plantLocationRequest.isHarvest());

            plantingLocationRepository.save(plantingLocation);
            return getPlantLocationById(plantingLocation.getPlantLocationId());
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public PlantingLocationDTO deletePlantLocation(int id) {
        try{
            PlantingLocationDTO plantingLocationDTO = getPlantLocationById(id);
            PlantingLocation plantingLocation = plantingLocationRepository.findByPlantLocationId(id);
            plantingLocation.setDeleted(true);
            plantingLocationRepository.save(plantingLocation);
            return plantingLocationDTO;
        }catch (Exception e){
            return null;
        }
    }

}
