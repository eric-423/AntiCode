package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.FarmDTO;
import com.sba.exam.sba.entity.Farm;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.payload.request.FarmRequest;
import com.sba.exam.sba.repository.FarmRepository;
import com.sba.exam.sba.service.imp.FarmServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FarmService implements FarmServiceImp {

    @Autowired
    FarmRepository farmRepository;

    @Override
    public List<FarmDTO> getFarmList() {
        List<Farm> farmList = farmRepository.findAll();
        List<FarmDTO> result = new ArrayList<>();
        for(Farm farm : farmList){
            FarmDTO farmDTO = getFarmById(farm.getFarmId());
            result.add(farmDTO);
        }
        return result;
    }

    @Override
    public FarmDTO getFarmById(int id) {
        Farm farm = farmRepository.findByFarmId(id);
        FarmDTO farmDTO = new FarmDTO();
        farmDTO.setFarmId(farm.getFarmId());
        farmDTO.setFarmName(farm.getFarmName());
        farmDTO.setFarmExtend(farm.getFarmExtend());
        farmDTO.setFarmAddress(farm.getFarmAddress());

        return farmDTO;
    }

    @Override
    @Transactional
    public FarmDTO addFarm(FarmRequest farmRequest) {
        try{
            Farm farm = new Farm();

            farm.setFarmName(farmRequest.getFarmName());
            farm.setFarmExtend(farmRequest.getFarmExtend());
            farm.setFarmAddress(farmRequest.getFarmAddress());
            farmRepository.save(farm);

            FarmDTO result = new FarmDTO();
            result.setFarmId(farm.getFarmId());

            return result;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    @Transactional
    public FarmDTO updateFarm(FarmRequest farmRequest) {
        try{
            Farm farm = farmRepository.findByFarmId(farmRequest.getFarmId());
            farm.setFarmName(farmRequest.getFarmName());
            farm.setFarmExtend(farmRequest.getFarmExtend());
            farm.setFarmAddress(farmRequest.getFarmAddress());
            farmRepository.save(farm);

            FarmDTO result = new FarmDTO();
            result.setFarmId(farm.getFarmId());

            return result;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    @Transactional
    public FarmDTO deleteFarm(int id) {
        try {
            Farm farm = farmRepository.findByFarmId(id);
            farmRepository.delete(farm);

            FarmDTO result = new FarmDTO();
            result.setFarmId(farm.getFarmId());

            return result;
        } catch (Exception e){
            return null;
        }
    }
}
