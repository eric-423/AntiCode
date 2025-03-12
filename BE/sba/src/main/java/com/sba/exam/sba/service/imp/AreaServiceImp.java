package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.AreaDTO;
import com.sba.exam.sba.payload.request.AreaRequest;

import java.util.List;

public interface AreaServiceImp {
    AreaDTO createArea(AreaRequest areaRequest);

    List<AreaDTO> getALlArea();

    AreaDTO updateArea(AreaRequest areaRequest, int id);

    AreaDTO deleteArea(int id);

    AreaDTO getAreaById(int id);

    AreaDTO getAreaByFarm_FarmId(int farmId);
}
