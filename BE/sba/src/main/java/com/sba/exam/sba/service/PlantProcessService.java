package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.*;
import com.sba.exam.sba.entity.*;
import com.sba.exam.sba.exception.ResourceNotFoundException;
import com.sba.exam.sba.payload.request.PlantingProcessRequest;
import com.sba.exam.sba.payload.request.WaterProcessRequest;
import com.sba.exam.sba.repository.*;
import com.sba.exam.sba.service.imp.PlantProcessServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PlantProcessService implements PlantProcessServiceImp {

    @Autowired
    private PlantingProcessRepository plantingProcessRepository;

    @Autowired
    private ChemicalRepository chemicalRepository;

    @Autowired
    private PlantMediumRepository plantMediumRepository;

    @Autowired
    private FarmingEquipmentRepository farmingEquipmentRepository;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private PlantPotRepository plantPotRepository;

    @Autowired
    private WaterRepository waterRepository;


    public PlantingProcessDTO toDTO(PlantingProcess plantingProcess) {
        PlantingProcessDTO plantingProcessDTO = new PlantingProcessDTO();
        plantingProcessDTO.setPlantingProcessId(plantingProcess.getId());
        plantingProcessDTO.setPlantId(plantingProcess.getPlant().getPlantId());
        plantingProcessDTO.setPlantingProcessName(plantingProcess.getName());
        plantingProcessDTO.setPlantingProcessDescription(plantingProcess.getDescription());
        plantingProcessDTO.setCreatedAt(plantingProcess.getCreatedAt());

        if (plantingProcess.getPlantMedium() != null) {
            plantingProcessDTO.setPlantingMediumProcessDTO(getPlantingMediumProcessDTO(plantingProcess));
        }

        if (plantingProcess.getPlantPot() != null) {

            plantingProcessDTO.setPlantingPotProcessDTO(getPlantingPotProcessDTO(plantingProcess));
        }

        if (plantingProcess.getWater() != null) {
            plantingProcessDTO.setWaterProcessDTO(getWaterProcessDTO(plantingProcess));
        }

        if (plantingProcess.getAgriculturalChemical() != null) {
            plantingProcessDTO.setChemicalProcessDTO(getChemicalProcessDTO(plantingProcess));
        }

        if (plantingProcess.getFarmingEquipment() != null) {
            plantingProcessDTO.setFarmingEquipmentProcessDTO(getFarmingEquipmentProcessDTO(plantingProcess));
        }
        return plantingProcessDTO;

    }

    private FarmingEquipmentProcessDTO getFarmingEquipmentProcessDTO(PlantingProcess plantingProcess) {
        FarmingEquipmentProcessDTO farmingEquipmentProcessDTO = new FarmingEquipmentProcessDTO();
        FarmingEquipment farmingEquipment = plantingProcess.getFarmingEquipment();
        farmingEquipmentProcessDTO.setEquipmentId(farmingEquipment.getId());
        farmingEquipmentProcessDTO.setProcessId(plantingProcess.getId());
        farmingEquipmentProcessDTO.setEquipmentName(farmingEquipment.getName());

        return farmingEquipmentProcessDTO;
    }

    private ChemicalProcessDTO getChemicalProcessDTO(PlantingProcess plantingProcess) {
        ChemicalProcessDTO chemicalProcessDTO = new ChemicalProcessDTO();
        AgriculturalChemical agriculturalChemical = plantingProcess.getAgriculturalChemical();

        chemicalProcessDTO.setChemicalId(agriculturalChemical.getId());
        chemicalProcessDTO.setProcessId(plantingProcess.getId());
        chemicalProcessDTO.setChemicalName(agriculturalChemical.getName());
        chemicalProcessDTO.setChemicalVolume(plantingProcess.getChemicalWeight());
        chemicalProcessDTO.setChemicalDescription(agriculturalChemical.getDescription());
        return chemicalProcessDTO;
    }

    private WaterProcessDTO getWaterProcessDTO(PlantingProcess plantingProcess) {
        WaterProcessDTO waterProcessDTO = new WaterProcessDTO();
        waterProcessDTO.setProcessId(plantingProcess.getId());
        waterProcessDTO.setWaterId(plantingProcess.getWater().getId());
        waterProcessDTO.setWaterName(plantingProcess.getWater().getWaterName());
        waterProcessDTO.setVolume(plantingProcess.getWaterVolumn());

        return waterProcessDTO;
    }

    private PlantingPotProcessDTO getPlantingPotProcessDTO(PlantingProcess plantingProcess) {
        PlantingPotProcessDTO plantingPotProcessDTO = new PlantingPotProcessDTO();
        plantingPotProcessDTO.setPlantingPotId(plantingProcess.getPlantPot().getPotId());
        plantingPotProcessDTO.setProcessId(plantingProcess.getId());
        plantingPotProcessDTO.setPlantingPotSize(plantingProcess.getPlantPot().getPotSize());
        plantingPotProcessDTO.setPlantingPotMaterial(plantingProcess.getPlantPot().getPotMaterial());
        return plantingPotProcessDTO;
    }

    private PlantingMediumProcessDTO getPlantingMediumProcessDTO(PlantingProcess plantingProcess) {
        PlantingMediumProcessDTO plantingMediumProcessDTO = new PlantingMediumProcessDTO();
        PlantMedium plantMedium = plantingProcess.getPlantMedium();

        plantingMediumProcessDTO.setPlantingMediumId(plantMedium.getMediumId());
        plantingMediumProcessDTO.setProcessId(plantingProcess.getId());
        plantingMediumProcessDTO.setPlantingMediumName(plantMedium.getMediumName());
        plantingMediumProcessDTO.setPlantingMediumWeight(plantingProcess.getMediumWeight());
        return plantingMediumProcessDTO;
    }


    @Override
    public PlantingProcessDTO createPlantProcess(PlantingProcessRequest plantProcessRequest) {
        PlantingProcess plantingProcess = new PlantingProcess();
        plantingProcess.setName(plantProcessRequest.getName());
        plantingProcess.setDescription(plantProcessRequest.getDescription());
        plantingProcess.setCreatedAt(new Date());

        plantingProcessRepository.save(plantingProcess);

        if (plantProcessRequest.getPlantingMediumId() != null) {
            PlantMedium plantMedium = plantMediumRepository.findByMediumId(plantProcessRequest.getPlantingMediumId());
            plantingProcess.setPlantMedium(plantMedium);
            plantingProcess.setMediumWeight(plantProcessRequest.getMediumWeight());
        }

        if (plantProcessRequest.getPlantPotId() != null) {
            PlantPot plantPot = plantPotRepository.findByPotId(plantProcessRequest.getPlantPotId());
            plantingProcess.setPlantPot(plantPot);
        }

        if (plantProcessRequest.getChemicalId() != null) {
            AgriculturalChemical agriculturalChemical = chemicalRepository.findById(plantProcessRequest.getChemicalId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Chemical"));
            plantingProcess.setAgriculturalChemical(agriculturalChemical);
            plantingProcess.setChemicalWeight(plantProcessRequest.getChemicalVolumn());
        }

        if (plantProcessRequest.getWaterId() != null) {
            Water water = waterRepository.findById(plantProcessRequest.getWaterId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Water"));
            plantingProcess.setWater(water);
            plantingProcess.setWaterVolumn(plantProcessRequest.getWaterVolumn());
        }

        if (plantProcessRequest.getFarmingEquipmentId() != null) {
            FarmingEquipment farmingEquipment = farmingEquipmentRepository.findById(plantProcessRequest.getFarmingEquipmentId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Equipment"));
            plantingProcess.setFarmingEquipment(farmingEquipment);
        }

        plantingProcess.setPlant(plantRepository.findByPlantId(plantProcessRequest.getPlantId()));

        plantingProcessRepository.save(plantingProcess);

        return toDTO(plantingProcess);
    }

    @Override
    public PlantingProcessDTO updatePlantProcess(int id, PlantingProcessRequest plantProcessRequest) {
        PlantingProcess plantingProcess = plantingProcessRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Planting Process"));
        plantingProcess.setName(plantProcessRequest.getName());
        plantingProcess.setDescription(plantProcessRequest.getDescription());
        plantingProcess.setCreatedAt(new Date());

        if (plantProcessRequest.getPlantingMediumId() != null) {
            PlantMedium plantMedium = plantMediumRepository.findByMediumId(plantProcessRequest.getPlantingMediumId());
            plantingProcess.setPlantMedium(plantMedium);
            plantingProcess.setMediumWeight(plantProcessRequest.getMediumWeight());
        }

        if (plantProcessRequest.getPlantPotId() != null) {
            PlantPot plantPot = plantPotRepository.findByPotId(plantProcessRequest.getPlantPotId());
            plantingProcess.setPlantPot(plantPot);
        }

        if (plantProcessRequest.getChemicalId() != null) {
            AgriculturalChemical agriculturalChemical = chemicalRepository.findById(plantProcessRequest.getChemicalId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Chemical"));
            plantingProcess.setAgriculturalChemical(agriculturalChemical);
            plantingProcess.setChemicalWeight(plantProcessRequest.getChemicalVolumn());
        }

        if (plantProcessRequest.getWaterId() != null) {
            Water water = waterRepository.findById(plantProcessRequest.getWaterId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Water"));
            plantingProcess.setWater(water);
            plantingProcess.setWaterVolumn(plantProcessRequest.getWaterVolumn());
        }

        if (plantProcessRequest.getFarmingEquipmentId() != null) {
            FarmingEquipment farmingEquipment = farmingEquipmentRepository.findById(plantProcessRequest.getFarmingEquipmentId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Equipment"));
            plantingProcess.setFarmingEquipment(farmingEquipment);
        }

        plantingProcess.setPlant(plantRepository.findByPlantId(plantProcessRequest.getPlantId()));

        plantingProcessRepository.save(plantingProcess);
        return toDTO(plantingProcess);
    }

    @Override
    public Page<PlantingProcessDTO> getAllPlantProcesses(int page, int size) {
        List<PlantingProcess> plantingProcessList = plantingProcessRepository.findAll();
        List<PlantingProcessDTO> plantingProcessDTOList = new ArrayList<>();

        for (PlantingProcess plantingProcess : plantingProcessList) {
            PlantingProcessDTO plantingProcessDTO = toDTO(plantingProcess);
            plantingProcessDTOList.add(plantingProcessDTO);
        }

        int totalElements = plantingProcessDTOList.size();
        int start = Math.min(page * size, totalElements);
        int end = Math.min(start + size, totalElements);
        List<PlantingProcessDTO> plantingProcessDTOSublist = plantingProcessDTOList.subList(start, end);


        return new PageImpl<>(plantingProcessDTOSublist, PageRequest.of(page, size), totalElements);
    }

    @Override
    public PlantingProcessDTO getPlantProcessById(int id) {
        PlantingProcess plantingProcess = plantingProcessRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Planting Process"));
        return toDTO(plantingProcess);
    }

    @Override
    public List<PlantingProcessDTO> getAllPlantProcessesByPlantId(int id) {
        List<PlantingProcess> plantingProcessList = plantingProcessRepository.getPlantingProcessesByPlant_PlantId(id);
        List<PlantingProcessDTO> plantingProcessDTOS = new ArrayList<>();
        for(PlantingProcess plantingProcess : plantingProcessList) {
            PlantingProcessDTO plantingProcessDTO = toDTO(plantingProcess);
            plantingProcessDTO.setPlantingProcessId(plantingProcess.getId());
            plantingProcessDTO.setPlantingProcessName(plantingProcess.getName());
            plantingProcessDTOS.add(plantingProcessDTO);
        }
        return plantingProcessDTOS;
    }


    @Override
    public Page<PlantingProcessDTO> findBySearchTerm(String searchTerm, int page, int size) {
        return null;
    }
}
