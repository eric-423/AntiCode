package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.PlantTypeDTO;
import com.sba.exam.sba.entity.PlantType;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface PlantTypeServiceImp {
     List<PlantType> getAllPlantTypes();
     boolean createPlantType(PlantTypeDTO plantTypeDTO);
     boolean updatePlantType(PlantTypeDTO plantTypeDTO);
     boolean deletePlantType(Integer plantTypeId);
}
