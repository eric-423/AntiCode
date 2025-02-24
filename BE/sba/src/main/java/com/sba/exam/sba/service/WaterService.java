package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.WaterDTO;
import com.sba.exam.sba.entity.Water;
import com.sba.exam.sba.payload.WaterRequest;
import com.sba.exam.sba.repository.WaterRepository;
import com.sba.exam.sba.service.imp.WaterServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WaterService implements WaterServiceImp {

    @Autowired
    private WaterRepository waterRepository;

    @Override
    public List<WaterDTO> getWaterList() {
        List<Water> waterList = waterRepository.findAll();
        List<WaterDTO> waterDTOList = new ArrayList<WaterDTO>();
        for (Water water : waterList) {
            WaterDTO waterDTO = getWaterById(water.getId());
            waterDTOList.add(waterDTO);
        }
        return waterDTOList;
    }

    @Override
    public WaterDTO getWaterById(int id) {
        Water water = waterRepository.findWaterById(id);
        WaterDTO waterDTO = new WaterDTO();
        waterDTO.setWaterId(water.getId());
        waterDTO.setWaterName(water.getWaterName());
        waterDTO.setPurity(water.getPurity());
        waterDTO.setPHLevel(water.getPHLevel());
        waterDTO.setVolumeAvailable(water.getVolumeAvailable());
        return waterDTO;
    }

    @Override
    @Transactional
    public WaterDTO addWater(WaterRequest waterRequest) {
        try{
            Water water = new Water();
            if(waterRequest.getPHLevel() >= 0 && waterRequest.getPHLevel() <= 14 && waterRequest.getPurity() >= 0
               && waterRequest.getVolumeAvailable() >= 0 && waterRequest.getVolumeAvailable() <= 100) {
                water.setWaterName(waterRequest.getWaterName());
                water.setPurity(waterRequest.getPurity());
                water.setPHLevel(waterRequest.getPHLevel());
                water.setVolumeAvailable(waterRequest.getVolumeAvailable());
                waterRepository.save(water);

                WaterDTO waterDTO = new WaterDTO();
                waterDTO.setWaterId(water.getId());

                return waterDTO;
            }else{
                throw new Exception();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    @Transactional
    public WaterDTO updateWater(WaterRequest waterRequest) {
        try{
            if(waterRequest.getPHLevel() >= 0 && waterRequest.getPHLevel() <= 14 && waterRequest.getPurity() >= 0
                    && waterRequest.getVolumeAvailable() >= 0 && waterRequest.getVolumeAvailable() <= 100) {
                Water water = waterRepository.findWaterById(waterRequest.getWaterId());
                water.setWaterName(waterRequest.getWaterName());
                water.setPurity(waterRequest.getPurity());
                water.setPHLevel(waterRequest.getPHLevel());
                water.setVolumeAvailable(waterRequest.getVolumeAvailable());
                waterRepository.save(water);
                WaterDTO waterDTO = new WaterDTO();
                waterDTO.setWaterId(water.getId());
                return waterDTO;
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
