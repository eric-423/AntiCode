package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlansDTO;
import com.sba.exam.sba.dto.PlantingLocationDTO;
import com.sba.exam.sba.dto.PlantingProcessDTO;
import com.sba.exam.sba.entity.*;
import com.sba.exam.sba.payload.request.PlantingLocationRequest;
import com.sba.exam.sba.repository.*;
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

    @Autowired
    PlantingProcessRepository plantingProcessRepository;

    @Autowired
    PlantProcessService plantProcessService;

    @Override
    public List<PlantingLocationDTO> getPlantLocationList() {
        List<PlantingLocation> plantingLocationList = plantingLocationRepository.findByIsDeleted(false);
        List<PlantingLocationDTO> result = new ArrayList<>();

        for(PlantingLocation plantingLocation : plantingLocationList){
            PlantingLocationDTO plantingLocationDTO = transferDTO(plantingLocation);
            result.add(plantingLocationDTO);
        }
        return result;
    }

    @Override
    public List<PlantingProcessDTO> getAllProcessNotInTask(int plantingLocationId) {
//        PlantingLocation plantingLocation = plantingLocationRepository.findByPlantLocationId(plantingLocationId);
//
//        List<PlantingProcess> plantingProcesses = plantingProcessRepository.findByPlant_PlantId(plantingLocation.getPlant().getPlantId());
//        List<Task> taskList = new ArrayList<>();
//
//        for(PlantingLocationTask task : taskList){
//
//        }
//
//        List<PlantingProcessDTO> plantingProcessDTOS = new ArrayList<>();
//        for(PlantingProcess plantingProcess : plantingProcesses){
//            boolean check = false;
//            for(Task task : taskList){
//                if(plantingProcess.getId() == task.getPlantingProcess().getId()){
//                    plantingProcesses.remove(plantingProcess);
//                    check = true;
//                }
//                if(!check){
//                    PlantingProcessDTO plantingProcessDTO = plantProcessService.toDTO(plantingProcess);
//                    plantingProcessDTOS.add(plantingProcessDTO);
//                }
//            }
//        }
//        return plantingProcessDTOS;
        return null;
    }

    @Override
    public List<PlansDTO> getAllPlans() {
        List<Long> plans = plantingLocationRepository.getDistinctPlans();
        List<PlansDTO> plansDTOS = new ArrayList<>();
        for(Long plan : plans){
            PlantingLocation plantingLocation = plantingLocationRepository.findFirstByPlans(plan);
            PlansDTO plansDTO = new PlansDTO();
            plansDTO.setNamePlans(plantingLocation.getPlant().getPlantName());
            plansDTO.setStartHarvest(plantingLocation.getStartDate());
            plansDTO.setEndHarvest(plantingLocation.getEndDate());
            plansDTO.setPlans(plan);
            plansDTOS.add(plansDTO);
        }
        return plansDTOS;
    }

    @Override
    public PlansDTO getByPlans(long plan) {
        return null;
    }


    private PlantingLocationDTO transferDTO(PlantingLocation plantingLocation){
        PlantingLocationDTO plantingLocationDTO = new PlantingLocationDTO();
        Plant plant = plantingLocation.getPlant();
        Location location = plantingLocation.getLocation();
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

    @Override
    public PlantingLocationDTO getPlantLocationById(int id) {
        PlantingLocation plantingLocation = plantingLocationRepository.findByPlantLocationId(id);

        if(plantingLocation==null){
            return null;
        } else{
            return transferDTO(plantingLocation);
        }
    }

    @Override
    @Transactional
    public PlantingLocationDTO addPlantLocation(PlantingLocationRequest plantLocationRequest) {
        try {
            PlantingLocation plantingLocation = new PlantingLocation();
            Plant plant = plantRepository.findByPlantId(plantLocationRequest.getPlantId());
            Location location = locationRepository.findByLocationId(plantLocationRequest.getLocationId());
            location.setPlanted(true);
            locationRepository.save(location);
            plantingLocation.setPlant(plant);
            plantingLocation.setLocation(location);
            plantingLocation.setStartDate(plantLocationRequest.getStartDate());
            plantingLocation.setEndDate(plantLocationRequest.getEndDate());
            plantingLocation.setHarvest(false);
            plantingLocation.setDeleted(false);
            plantingLocation.setPlans(plantLocationRequest.getPlans());
            plantingLocationRepository.save(plantingLocation);
            return getPlantLocationById(plantingLocation.getPlantLocationId());
        }catch (Exception e){
            e.printStackTrace();
            throw  new RuntimeException(e);
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
