package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.PlantingProcessDTO;
import com.sba.exam.sba.entity.PlantingProcess;
import com.sba.exam.sba.payload.request.PlantingProcessRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PlantProcessServiceImp {
    public PlantingProcessDTO createPlantProcess(PlantingProcessRequest plantProcessRequest);

    public PlantingProcessDTO updatePlantProcess(int id, PlantingProcessRequest plantProcessRequest);

    public Page<PlantingProcessDTO> getAllPlantProcesses(int page, int size);

    public PlantingProcessDTO getPlantProcessById(int id);

    public List<PlantingProcessDTO> getAllPlantProcessesByPlantId(int id);

    public Page<PlantingProcessDTO> findBySearchTerm(String searchTerm, int page, int size);
}
