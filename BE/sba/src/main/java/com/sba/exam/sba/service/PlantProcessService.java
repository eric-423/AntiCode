package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.*;
import com.sba.exam.sba.entity.*;
import com.sba.exam.sba.entity.keys.KeyFarmingEquipmentTask;
import com.sba.exam.sba.entity.keys.KeyTaskAgriculturalChemical;
import com.sba.exam.sba.exception.ResourceNotFoundException;
import com.sba.exam.sba.payload.request.ChemicalProcessRequest;
import com.sba.exam.sba.payload.request.PlantingMediumProcessRequest;
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
import java.util.Set;

@Service
public class PlantProcessService implements PlantProcessServiceImp {

    @Autowired
    private PlantingProcessRepository plantingProcessRepository;

    @Autowired
    private PlantingMediumTaskRepository plantingMediumTaskRepository;

    @Autowired
    private PlantingPotTaskRepository plantingPotTaskRepository;

    @Autowired
    private WaterTaskRepository waterTaskRepository;

    @Autowired
    private ChemicalTaskRepository chemicalTaskRepository;

    @Autowired
    private ChemicalRepository chemicalRepository;

    @Autowired
    private FarmingEquipmentTaskRepository farmingEquipmentTaskRepository;

    @Autowired
    private PlantMediumRepository plantMediumRepository;

    @Autowired
    private FarmingEquipmentRepository farmingEquipmentRepository;

    @Autowired
    private PlantRepository plantRepository;

    private PlantingProcessDTO toDTO(PlantingProcess plantingProcess) {
        PlantingProcessDTO plantingProcessDTO = new PlantingProcessDTO();
        plantingProcessDTO.setPlantingProcessId(plantingProcess.getId());
        plantingProcessDTO.setPlantId(plantingProcess.getPlant().getPlantId());
        plantingProcessDTO.setPlantingProcessName(plantingProcess.getName());
        plantingProcessDTO.setPlantingProcessDescription(plantingProcess.getDescription());
        plantingProcessDTO.setCreatedAt(plantingProcess.getCreatedAt());

        if (plantingProcess.getPlantMediumTasks() != null && !plantingProcess.getPlantMediumTasks().isEmpty()) {
            List<PlantingMediumProcessDTO> plantingMediumProcessDTOList = new ArrayList<>();
            List<PlantMediumTask> plantMediumTasks = plantingProcess.getPlantMediumTasks();
            
            for(PlantMediumTask plantMediumTask : plantMediumTasks){
                PlantingMediumProcessDTO plantingMediumProcessDTO = getPlantingMediumProcessDTO(plantingProcess, plantMediumTask);
                plantingMediumProcessDTOList.add(plantingMediumProcessDTO);
            }
            plantingProcessDTO.setPlantingMediumProcessDTO(plantingMediumProcessDTOList);
        }

        if (plantingProcess.getPlantPotTasks() != null) {
            List<PlantPotTask> plantPotTasks = plantingProcess.getPlantPotTasks();
            List<PlantingPotProcessDTO> plantingPotProcessDTOList = new ArrayList<>();
            
            for(PlantPotTask plantPotTask : plantPotTasks){
                PlantingPotProcessDTO plantingPotProcessDTO = getPlantingPotProcessDTO(plantingProcess, plantPotTask);
                plantingPotProcessDTOList.add(plantingPotProcessDTO);
            }

            plantingProcessDTO.setPlantingPotProcessDTO(plantingPotProcessDTOList);
        }

        if (plantingProcess.getWaterTasks() != null) {
            List<WaterProcessDTO> waterProcessDTOList = new ArrayList<>();
            List<WaterTask> waterTasks = plantingProcess.getWaterTasks();

            for(WaterTask waterTask : waterTasks){
                WaterProcessDTO waterProcessDTO = getWaterProcessDTO(plantingProcess, waterTask);
                waterProcessDTOList.add(waterProcessDTO);
            }
            plantingProcessDTO.setWaterProcessDTO(waterProcessDTOList);
        }

        if (plantingProcess.getTaskAgriculturalChemicals() != null) {
            Set<TaskAgriculturalChemical> taskAgriculturalChemicals = plantingProcess.getTaskAgriculturalChemicals();
            List<ChemicalProcessDTO> chemicalProcessDTOList = new ArrayList<>();

            for(TaskAgriculturalChemical taskAgriculturalChemical : taskAgriculturalChemicals){
                ChemicalProcessDTO chemicalProcessDTO = getChemicalProcessDTO(taskAgriculturalChemical);
                chemicalProcessDTOList.add(chemicalProcessDTO);
            }

            plantingProcessDTO.setChemicalProcessDTO(chemicalProcessDTOList);
        }

        if (plantingProcess.getFarmingEquipmentTasks() != null) {
            Set<FarmingEquipmentTask> farmingEquipmentTasks = plantingProcess.getFarmingEquipmentTasks();
            List<FarmingEquipmentProcessDTO> farmingEquipmentProcessDTOList = new ArrayList<>();

            for(FarmingEquipmentTask farmingEquipmentTask : farmingEquipmentTasks){
                FarmingEquipmentProcessDTO farmingEquipmentProcessDTO = getFarmingEquipmentProcessDTO(plantingProcess, farmingEquipmentTask);
                farmingEquipmentProcessDTOList.add(farmingEquipmentProcessDTO);
            }
            plantingProcessDTO.setFarmingEquipmentProcessDTO(farmingEquipmentProcessDTOList);
        }
        return plantingProcessDTO;

    }

    private FarmingEquipmentProcessDTO getFarmingEquipmentProcessDTO(PlantingProcess plantingProcess, FarmingEquipmentTask farmingEquipmentTask) {
        FarmingEquipmentProcessDTO farmingEquipmentProcessDTO = new FarmingEquipmentProcessDTO();
        FarmingEquipment farmingEquipment = farmingEquipmentTask.getFarmingEquipment();
        farmingEquipmentProcessDTO.setEquipmentId(farmingEquipment.getId());
        farmingEquipmentProcessDTO.setProcessId(plantingProcess.getId());
        farmingEquipmentProcessDTO.setEquipmentName(farmingEquipment.getName());

        return farmingEquipmentProcessDTO;
    }

    private ChemicalProcessDTO getChemicalProcessDTO(TaskAgriculturalChemical taskAgriculturalChemical) {
        ChemicalProcessDTO chemicalProcessDTO = new ChemicalProcessDTO();
        AgriculturalChemical agriculturalChemical = taskAgriculturalChemical.getAgriculturalChemical();
        chemicalProcessDTO.setChemicalId(agriculturalChemical.getId());
        chemicalProcessDTO.setProcessId(taskAgriculturalChemical.getPlantingProcess().getId());
        chemicalProcessDTO.setChemicalName(agriculturalChemical.getName());
        chemicalProcessDTO.setChemicalVolume(taskAgriculturalChemical.getVolumn());
        chemicalProcessDTO.setChemicalDescription(agriculturalChemical.getDescription());
        return chemicalProcessDTO;
    }

    private WaterProcessDTO getWaterProcessDTO(PlantingProcess plantingProcess, WaterTask waterTask) {
        WaterProcessDTO waterProcessDTO = new WaterProcessDTO();
        waterProcessDTO.setProcessId(plantingProcess.getId());
        waterProcessDTO.setWaterId(waterTask.getWater().getId());
        waterProcessDTO.setWaterName(waterTask.getWater().getWaterName());
        waterProcessDTO.setVolume((float) waterTask.getVolume());

        return waterProcessDTO;
    }

    private PlantingPotProcessDTO getPlantingPotProcessDTO(PlantingProcess plantingProcess, PlantPotTask plantPotTask) {
        PlantingPotProcessDTO plantingPotProcessDTO = new PlantingPotProcessDTO();
        plantingPotProcessDTO.setPlantingPotId(plantPotTask.getPlantPot().getPotId());
        plantingPotProcessDTO.setProcessId(plantingProcess.getId());
        plantingPotProcessDTO.setPlantingPotSize(plantPotTask.getPlantPot().getPotSize());
        plantingPotProcessDTO.setPlantingPotQuantity(plantPotTask.getQuantity());
        plantingPotProcessDTO.setPlantingPotMaterial(plantPotTask.getPlantPot().getPotMaterial());
        return plantingPotProcessDTO;
    }

    private PlantingMediumProcessDTO getPlantingMediumProcessDTO(PlantingProcess plantingProcess, PlantMediumTask plantMediumTask) {
        PlantingMediumProcessDTO plantingMediumProcessDTO = new PlantingMediumProcessDTO();
        PlantMedium plantMedium = plantMediumTask.getPlantMedium();

        plantingMediumProcessDTO.setPlantingMediumId(plantMedium.getMediumId());
        plantingMediumProcessDTO.setProcessId(plantingProcess.getId());
        plantingMediumProcessDTO.setPlantingMediumName(plantMedium.getMediumName());
        plantingMediumProcessDTO.setPlantingMediumWeight(plantMediumTask.getMediumWeight());
        return plantingMediumProcessDTO;
    }


    @Override
    public PlantingProcessDTO createPlantProcess(PlantingProcessRequest plantProcessRequest) {
        PlantingProcess plantingProcess = new PlantingProcess();
        plantingProcess.setName(plantProcessRequest.getName());
        plantingProcess.setDescription(plantProcessRequest.getDescription());
        plantingProcess.setCreatedAt(new Date());
        plantingProcessRepository.save(plantingProcess);

        for(PlantingMediumProcessRequest plantMediumTaskRequest : plantProcessRequest.getPlantingMediumProcessRequestList()) {
            PlantMediumTask plantMediumTask = new PlantMediumTask();
            plantMediumTask.setPlantingProcess(plantingProcess);
            plantMediumTask.setPlantMedium(plantMediumRepository.findById(plantMediumTaskRequest.getPlantingMeiumId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Planting Medium")));
            plantMediumTask.setMediumWeight(plantMediumTaskRequest.getMediumWeight());
        }


        PlantPotTask plantPotTask = new PlantPotTask();
        plantPotTask.setPlantingProcess(plantingProcess);
        plantPotTask.setPlantPot(plantingPotTaskRepository.findById(plantProcessRequest.getPlantPotId()).orElseThrow(()->new ResourceNotFoundException("Invalid Planting Pot")).getPlantPot());
        plantPotTask.setQuantity(1);
        plantingPotTaskRepository.save(plantPotTask);

        for(WaterProcessRequest waterProcessRequest : plantProcessRequest.getWaterProcessRequestList()) {
            WaterTask waterTask = new WaterTask();
            waterTask.setPlantingProcess(plantingProcess);
            waterTask.setWater(waterTaskRepository.findById(waterProcessRequest.getWaterId()).orElseThrow(()->new ResourceNotFoundException("Invalid Water")).getWater());
            waterTask.setVolume(waterProcessRequest.getWaterVolumn());
            waterTaskRepository.save(waterTask);
        }

        for(ChemicalProcessRequest chemicalProcessRequest : plantProcessRequest.getChemicalProcessRequestList()) {
            TaskAgriculturalChemical taskAgriculturalChemical = new TaskAgriculturalChemical();
            taskAgriculturalChemical.setPlantingProcess(plantingProcess);

            KeyTaskAgriculturalChemical keyTaskAgriculturalChemical = new KeyTaskAgriculturalChemical();
            keyTaskAgriculturalChemical.setChemicalId(chemicalRepository.findById(chemicalProcessRequest.getChemicalId()).orElseThrow(()->new ResourceNotFoundException("Invalid Chemical")).getId());
            keyTaskAgriculturalChemical.setProcess_id(plantingProcess.getId());
            taskAgriculturalChemical.setId(keyTaskAgriculturalChemical);

            taskAgriculturalChemical.setAgriculturalChemical(chemicalRepository.findById(chemicalProcessRequest.getChemicalId()).orElseThrow(()->new ResourceNotFoundException("Invalid Chemical")));
            taskAgriculturalChemical.setVolumn(chemicalProcessRequest.getChemicalVolumn());
            chemicalTaskRepository.save(taskAgriculturalChemical);
        }

        FarmingEquipmentTask farmingEquipmentTask = new FarmingEquipmentTask();
        KeyFarmingEquipmentTask keyFarmingEquipmentTask = new KeyFarmingEquipmentTask();
        keyFarmingEquipmentTask.setEquipmentId(farmingEquipmentRepository.findById(plantProcessRequest.getFarmingEquipmentId()).orElseThrow(()->new ResourceNotFoundException("Invalid Equipment")).getId());
        keyFarmingEquipmentTask.setProcessId(plantingProcess.getId());
        farmingEquipmentTask.setId(keyFarmingEquipmentTask);
        farmingEquipmentTask.setPlantingProcess(plantingProcess);
        farmingEquipmentTask.setFarmingEquipment(farmingEquipmentRepository.findById(plantProcessRequest.getFarmingEquipmentId()).orElseThrow(()->new ResourceNotFoundException("Invalid Equipment")));
        farmingEquipmentTaskRepository.save(farmingEquipmentTask);

        plantingProcess.setPlant(plantRepository.findByPlantId(plantProcessRequest.getPlantId()));

        plantingProcessRepository.save(plantingProcess);

        return toDTO(plantingProcess);
    }

    @Override
    public void updatePlantProcess(int id, PlantingProcessRequest plantProcessRequest) {

    }

    @Override
    public Page<PlantingProcessDTO> getAllPlantProcesses(int page, int size) {
        List<PlantingProcess> plantingProcessList = plantingProcessRepository.findAll();
        List<PlantingProcessDTO> plantingProcessDTOList = new ArrayList<>();

        for(PlantingProcess plantingProcess : plantingProcessList){
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
        PlantingProcess plantingProcess = plantingProcessRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid Planting Process"));
        return toDTO(plantingProcess);
    }

    @Override
    public Page<PlantingProcessDTO> findBySearchTerm(String searchTerm, int page, int size) {
        return null;
    }
}
