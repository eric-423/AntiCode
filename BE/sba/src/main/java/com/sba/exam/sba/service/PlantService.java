package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlantDTO;
import com.sba.exam.sba.entity.Plant;
import com.sba.exam.sba.repository.PlantRepository;
import com.sba.exam.sba.service.imp.PlantServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlantService implements PlantServiceImp {

    @Autowired
    PlantRepository plantRepository;

    @Override
    public List<PlantDTO> getAllPlant() {

        List<Plant> plants = plantRepository.findAll();
        List<PlantDTO> result = new ArrayList<>();

        for(Plant plant : plants){
            PlantDTO plantDTO = new PlantDTO();
            plantDTO.setPlantId(plant.getPlantId());
            plantDTO.setPlantName(plant.getPlantName());
            plantDTO.setPrice(plant.getPrice());
            plantDTO.setSize(plant.getSize());
            plantDTO.setSeed(plant.isSeed());
            plantDTO.setSpecies(plant.getSpecies());
            plantDTO.setDescription(plant.getDescription());
            plantDTO.setCharacteristics(plant.getCharacteristics());
            plantDTO.setAttracts(plant.getAttracts());
            plantDTO.setHardiness(plant.getHardiness());
            plantDTO.setHeatZones(plant.getHeatZones());

            result.add(plantDTO);

        }
        return result;
    }


}
