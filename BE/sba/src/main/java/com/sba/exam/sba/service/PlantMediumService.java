package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlantMediumDTO;
import com.sba.exam.sba.entity.PlantMedium;
import com.sba.exam.sba.payload.request.PlantMediumRequest;
import com.sba.exam.sba.repository.PlantMediumRepository;
import com.sba.exam.sba.service.imp.PlantMediumServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlantMediumService implements PlantMediumServiceImp {

    @Autowired
    PlantMediumRepository plantMediumRepository;

    @Override
    public List<PlantMediumDTO> findAllPlantMedium() {
        List<PlantMediumDTO> result = new ArrayList<>();
        List<PlantMedium> plantMediums = plantMediumRepository.findAll();
        for (PlantMedium plantMedium : plantMediums) {
            result.add(transferDTO(plantMedium));
        }
        ;
        return result;
    }

    @Override
    public PlantMediumDTO findById(int id) {
        PlantMedium plantMedium = plantMediumRepository.findByMediumId(id);
        if (plantMedium != null) {
            return transferDTO(plantMedium);
        }
        return null;
    }

    @Override
    public PlantMediumDTO update(PlantMediumRequest plantMediumRequest, int id) {
        PlantMedium plantMedium = plantMediumRepository.findByMediumId(id);
        plantMedium.setMediumId(plantMediumRequest.getMediumId());
        plantMedium.setMediumName(plantMediumRequest.getMediumName());
        plantMedium.setDescription(plantMediumRequest.getDescription());
        plantMedium.setMediumWeightAvailable(plantMediumRequest.getMediumWeightAvailable());

        plantMediumRepository.save(plantMedium);
        return transferDTO(plantMedium);
    }

    @Override
    public PlantMediumDTO create(PlantMediumRequest plantMediumRequest) {
        PlantMedium plantMedium = new PlantMedium();
        plantMedium.setMediumId(plantMediumRequest.getMediumId());
        plantMedium.setMediumName(plantMediumRequest.getMediumName());
        plantMedium.setDescription(plantMediumRequest.getDescription());
        plantMedium.setMediumWeightAvailable(plantMediumRequest.getMediumWeightAvailable());

        plantMediumRepository.save(plantMedium);
        return transferDTO(plantMedium);
    }

    @Override
    public PlantMediumDTO delete(int id) {
        return null;
    }

    public PlantMediumDTO transferDTO(PlantMedium plantMedium) {
        PlantMediumDTO plantMediumDTO = new PlantMediumDTO();
        plantMediumDTO.setMediumId(plantMedium.getMediumId());
        plantMediumDTO.setMediumName(plantMedium.getMediumName());
        plantMediumDTO.setDescription(plantMedium.getDescription());
        plantMediumDTO.setMediumWeightAvailable(plantMedium.getMediumWeightAvailable());

        return plantMediumDTO;
    }
}
