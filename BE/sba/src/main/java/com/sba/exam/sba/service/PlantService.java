package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlantDTO;
import com.sba.exam.sba.entity.Plant;
import com.sba.exam.sba.entity.PlantType;
import com.sba.exam.sba.repository.PlantRepository;
import com.sba.exam.sba.repository.PlantTypeRepository;
import com.sba.exam.sba.service.imp.PlantServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlantService implements PlantServiceImp {

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    private PlantTypeRepository plantTypeRepository;

    @Override
    public List<PlantDTO> getAllPlant() {

        List<Plant> plants = plantRepository.findByDeletedFalse();
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
            plantDTO.setPlantTypeId(plant.getPlantType().getPlantTypeId());
            result.add(plantDTO);
        }
        return result;
    }

    @Override
    public boolean addPlant(PlantDTO plantDTO) {
        try{
            Plant plant = new Plant();
            plant.setPlantName(plantDTO.getPlantName());
            plant.setPrice(plantDTO.getPrice());
            plant.setSize(plantDTO.getSize());
            plant.setSeed(plantDTO.isSeed());
            plant.setSpecies(plantDTO.getSpecies());
            plant.setDescription(plantDTO.getDescription());
            plant.setCharacteristics(plantDTO.getCharacteristics());
            plant.setAttracts(plantDTO.getAttracts());
            plant.setHardiness(plantDTO.getHardiness());
            plant.setHeatZones(plantDTO.getHeatZones());
            Optional<PlantType> plantType = plantTypeRepository.findById(plantDTO.getPlantTypeId());
            if(plantType.isEmpty()) throw new Exception();
            plant.setPlantType(plantType.get());
            plantRepository.save(plant);
            return true;
        } catch (Exception e) {
            System.out.println("Error add plant" + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean updatePlant(PlantDTO plantDTO) {
        try {
            System.out.println(plantDTO);
            Optional<Plant> plant = plantRepository.findById(plantDTO.getPlantId());
            if (plant.isEmpty()) throw new Exception();
            plant.get().setPlantName(plantDTO.getPlantName());
            plant.get().setPrice(plantDTO.getPrice());
            plant.get().setSize(plantDTO.getSize());
            plant.get().setSeed(plantDTO.isSeed());
            plant.get().setSpecies(plantDTO.getSpecies());
            plant.get().setDescription(plantDTO.getDescription());
            plant.get().setCharacteristics(plantDTO.getCharacteristics());
            plant.get().setAttracts(plantDTO.getAttracts());
            plant.get().setHardiness(plantDTO.getHardiness());
            plant.get().setHeatZones(plantDTO.getHeatZones());
            plant.get().setPlantId(plantDTO.getPlantId());
            plantRepository.save(plant.get());
            return true;
        } catch (Exception e) {
            System.out.println("Error updating plant" + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean deletePlant(List<Integer> listPlantId) {
        try{
            listPlantId.forEach(id -> {
                plantRepository.deleteById(id);
            });
            return true;
        } catch (Exception e) {
            System.out.println("Error deleting plant" + e.getMessage());
        }
        return false;
    }


}
