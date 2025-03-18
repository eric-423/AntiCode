package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.WaterDTO;
import com.sba.exam.sba.entity.Water;
import com.sba.exam.sba.entity.WaterTask;
import com.sba.exam.sba.payload.WaterRequest;
import com.sba.exam.sba.repository.WaterRepository;
import com.sba.exam.sba.repository.WaterTaskRepository;
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
    @Autowired
    private WaterTaskRepository waterTaskRepository;

    @Override
    public List<WaterDTO> getWaterList() {
        List<Water> waterList = waterRepository.findAll();
        List<WaterDTO> waterDTOList = new ArrayList<WaterDTO>();
        for (Water water : waterList) {
            if(water.isDeleted() == false) {
                WaterDTO waterDTO = getWaterById(water.getId());
                waterDTOList.add(waterDTO);
            }
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
        waterDTO.setDeleted(water.isDeleted());
        return waterDTO;
    }

    @Override
    @Transactional
    public WaterDTO addWater(WaterRequest waterRequest) {
        try{
            Water water = new Water();
            if(waterRequest.getPurity() <= 0 || waterRequest.getPHLevel() < 0 || waterRequest.getPHLevel() > 14 || waterRequest.getVolumeAvailable() <= 0)
                throw new Exception("Not Valid Value!!");
            water.setWaterName(waterRequest.getWaterName());
            water.setPurity(waterRequest.getPurity());
            water.setPHLevel(waterRequest.getPHLevel());
            water.setVolumeAvailable(waterRequest.getVolumeAvailable());
            water.setDeleted(false);
            waterRepository.save(water);

            WaterDTO waterDTO = new WaterDTO();
            waterDTO.setWaterId(water.getId());

            return waterDTO;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    @Transactional
    public WaterDTO updateWater(WaterRequest waterRequest) {
        try{
            if(waterRequest.getPurity() <= 0 || waterRequest.getPHLevel() < 0 || waterRequest.getPHLevel() > 14 || waterRequest.getVolumeAvailable() <= 0)
                throw new Exception("Not Valid Value!!");
            Water water = waterRepository.findWaterById(waterRequest.getWaterId());
            water.setWaterName(waterRequest.getWaterName());
            water.setPurity(waterRequest.getPurity());
            water.setPHLevel(waterRequest.getPHLevel());
            water.setVolumeAvailable(waterRequest.getVolumeAvailable());
            water.setDeleted(waterRequest.isDeleted());
            waterRepository.save(water);
            WaterDTO waterDTO = new WaterDTO();
            waterDTO.setWaterId(water.getId());
            return waterDTO;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public boolean deleteWaters(List<Integer> listWaterId) {
        try{
            List<Water> waterList = waterRepository.findAllById(listWaterId);
            List<WaterTask> waterTaskList = waterTaskRepository.getWaterTaskByWaterIdIn(listWaterId);
            for(Water water : waterList) {
                water.setDeleted(true);
            }
            if (!waterTaskList.isEmpty()) {
                waterTaskRepository.deleteAllInBatch(waterTaskList);
            }
            waterRepository.saveAll(waterList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return true;
    }
}
