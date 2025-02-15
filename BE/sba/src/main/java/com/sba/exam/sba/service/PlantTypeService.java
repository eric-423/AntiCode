package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.PlantTypeDTO;
import com.sba.exam.sba.entity.PlantType;
import com.sba.exam.sba.repository.PlantTypeRepository;
import com.sba.exam.sba.service.imp.PlantTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PlantTypeService implements PlantTypeServiceImp {

    @Autowired
    private PlantTypeRepository plantTypeRepository;

    @Override
    public List<PlantType> getAllPlantTypes() {
        return plantTypeRepository.findAll();
    }

    @Override
    public boolean createPlantType(PlantTypeDTO plantTypeDTO) {
       try{
           PlantType plantType = new PlantType();
           plantType.setPlantTypeName(plantTypeDTO.getPlantTypeName());
           plantType.setTypeDescription(plantTypeDTO.getTypeDescription());
           plantTypeRepository.save(plantType);
           return true;
       }catch (Exception e){
           System.out.println("Error createPlantType : " + e.getMessage());
       }
        return false;
    }

    @Override
    public boolean updatePlantType(PlantTypeDTO plantTypeDTO) {
        try{
            Optional<PlantType> plantType = plantTypeRepository.findById(plantTypeDTO.getPlantTypeId());
            if(plantType.isEmpty()) throw new Exception();
            PlantType plantTypeUpdate = plantType.get();
            plantTypeUpdate.setPlantTypeName(plantTypeDTO.getPlantTypeName());
            plantTypeUpdate.setTypeDescription(plantTypeDTO.getTypeDescription());
            plantTypeRepository.save(plantTypeUpdate);
            return true;
        } catch (Exception e) {
            System.out.println("Error createPlantType : "+ e.getMessage());
        }
        return false;
    }

    @Override
    public boolean deletePlantType(Integer plantTypeId) {
        try{
            plantTypeRepository.deleteById(plantTypeId);
            return true;
        }catch (Exception e){
            System.out.println("Error deletePlantType : " + e.getMessage());
        }
        return false;
    }
}
