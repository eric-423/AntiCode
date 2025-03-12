package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.AreaDTO;
import com.sba.exam.sba.entity.Area;
import com.sba.exam.sba.entity.Farm;
import com.sba.exam.sba.entity.Location;
import com.sba.exam.sba.payload.request.AreaRequest;
import com.sba.exam.sba.repository.AreaRepository;
import com.sba.exam.sba.repository.FarmRepository;
import com.sba.exam.sba.service.imp.AreaServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AreaService implements AreaServiceImp {

    @Autowired
    AreaRepository areaRepository;

    @Autowired
    FarmRepository farmRepository;

    @Autowired
    FarmService farmService;

    @Override
    @Transactional
    public AreaDTO createArea(AreaRequest areaRequest) {
        try {
            Area area = new Area();
            area.setAreaExtend(areaRequest.getAreaExtend());
            area.setAreaLength(areaRequest.getAreaLength());
            area.setAreaWidth(areaRequest.getAreaWidth());
            area.setAreaName(areaRequest.getAreaName());
            area.setFarm(farmRepository.findByFarmId(areaRequest.getFarmId()));

            areaRepository.save(area);
            return transferDTO(area);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<AreaDTO> getALlArea() {
        List<Area> areas = areaRepository.findByIsDeleted(false);
        List<AreaDTO> result = new ArrayList<>();
        for(Area area:areas){
            result.add(transferDTO(area));
        }

        return result;
    }

    @Override
    @Transactional
    public AreaDTO updateArea(AreaRequest areaRequest, int id) {
        try {
            Area area = areaRepository.findByAreaId(id);
            area.setAreaExtend(areaRequest.getAreaExtend());
            area.setAreaName(areaRequest.getAreaName());
            area.setFarm(farmRepository.findByFarmId(areaRequest.getFarmId()));
            area.setAreaWidth(areaRequest.getAreaWidth());
            area.setAreaLength(areaRequest.getAreaLength());
            areaRepository.save(area);
            return transferDTO(area);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    @Transactional
    public AreaDTO deleteArea(int id) {
        try {
            Area area = areaRepository.findByAreaId(id);
            area.setDeleted(true);
            AreaDTO areaDTO = transferDTO(area);
            areaRepository.save(area);
            return areaDTO;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public AreaDTO getAreaById(int id) {
        try {
            Area area = areaRepository.findByAreaId(id);
            return transferDTO(area);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<AreaDTO> getAreaByFarm_FarmId(int farmId) {
        try{
            List<Area> areaList = areaRepository.findAreaByFarm_FarmId(farmId);
            List<AreaDTO> areaDTOList = new ArrayList<>();
            for(Area area:areaList){
                areaDTOList.add(transferDTO(area));
            }
            return areaDTOList;
        }catch(Exception e){
            return null;
        }
    }

    public AreaDTO transferDTO(Area area){
        AreaDTO areaDTO = new AreaDTO();
        areaDTO.setAreaId(area.getAreaId());
        areaDTO.setAreaName(area.getAreaName());
        areaDTO.setAreaExtend(area.getAreaExtend());
        areaDTO.setAreaLength(area.getAreaLength());
        areaDTO.setAreaWidth(area.getAreaWidth());
        areaDTO.setFarm(farmService.transferDTO(area.getFarm()));
        return areaDTO;
    }
}
