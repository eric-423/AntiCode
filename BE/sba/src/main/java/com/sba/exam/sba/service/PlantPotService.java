package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlantPotDTO;
import com.sba.exam.sba.entity.Plant;
import com.sba.exam.sba.entity.PlantPot;
import com.sba.exam.sba.payload.request.PlantPotRequest;
import com.sba.exam.sba.repository.PlantPotRepository;
import com.sba.exam.sba.service.imp.PlantPotServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlantPotService implements PlantPotServiceImp {

    @Autowired
    PlantPotRepository plantPotRepository;

    @Override
    public List<PlantPotDTO> findAllPlantPot() {
        List<PlantPot> plantPots = plantPotRepository.findAll();
        List<PlantPotDTO> result = new ArrayList<>();

        for(PlantPot plantPot : plantPots){
            result.add(transferDTO(plantPot));
        }
        return result;
    }

    @Override
    public PlantPotDTO findById(int id) {
        PlantPot plantPot = plantPotRepository.findByPotId(id);
        if(plantPot != null){
            return transferDTO(plantPot);
        }
        return null;
    }

    @Override
    public PlantPotDTO update(PlantPotRequest plantPotRequest,int id) {
        PlantPot plantPot = plantPotRepository.findByPotId(id);
        plantPot.setPotSize(plantPotRequest.getPotSize());
        plantPot.setPotMaterial(plantPotRequest.getPotMaterial());
        plantPot.setPotQuantityAvailable(plantPotRequest.getPotQuantityAvailable());
        plantPotRepository.save(plantPot);

        return transferDTO(plantPot);
    }

    @Override
    public PlantPotDTO create(PlantPotRequest plantPotRequest) {
        PlantPot plantPot = new PlantPot();
        plantPot.setPotSize(plantPotRequest.getPotSize());
        plantPot.setPotMaterial(plantPotRequest.getPotMaterial());
        plantPot.setPotQuantityAvailable(plantPotRequest.getPotQuantityAvailable());
        plantPotRepository.save(plantPot);

        return transferDTO(plantPot);
    }

    @Override
    public PlantPotDTO delete(int id) {
        return null;
    }

    public PlantPotDTO transferDTO(PlantPot plantPot){
        PlantPotDTO result = new PlantPotDTO();
        result.setPotId(plantPot.getPotId());
        result.setPotSize(plantPot.getPotSize());
        result.setPotMaterial(plantPot.getPotMaterial());
        result.setPotQuantityAvailable(plantPot.getPotQuantityAvailable());

        return result;
    }
}
