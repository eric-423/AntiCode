package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.FarmDTO;
import com.sba.exam.sba.entity.Farm;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.FarmRequest;

import java.util.List;


public interface FarmServiceImp {
    public List<FarmDTO> getFarmList();
    public FarmDTO getFarmById(int id);
    public FarmDTO addFarm(FarmRequest farm);
    public FarmDTO updateFarm(FarmRequest farm);
    public FarmDTO deleteFarm(int id);
}
