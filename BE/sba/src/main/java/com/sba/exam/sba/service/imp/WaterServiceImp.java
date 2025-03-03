package com.sba.exam.sba.service.imp;


import com.sba.exam.sba.dto.WaterDTO;
import com.sba.exam.sba.payload.WaterRequest;

import java.util.List;

public interface WaterServiceImp {
    public List<WaterDTO> getWaterList();
    public WaterDTO getWaterById(int id);
    public WaterDTO addWater(WaterRequest waterRequest);
    public WaterDTO updateWater(WaterRequest waterRequest);
    public boolean deleteWaters(List<Integer> listWaterId);
}
