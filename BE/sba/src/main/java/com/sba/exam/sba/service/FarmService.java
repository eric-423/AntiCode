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
        List<Farm> farmList = farmRepository.findByIsDeleted(false);
        List<FarmDTO> result = new ArrayList<>();
        for (Farm farm : farmList) {
            result.add(transferDTO(farm));
        }
        return result;
    }

    @Override
    public FarmDTO getFarmById(int id) {
        Farm farm = farmRepository.findByFarmId(id);
        return transferDTO(farm);
    }

    public FarmDTO transferDTO(Farm farm) {
        FarmDTO farmDTO = new FarmDTO();
        farmDTO.setFarmId(farm.getFarmId());
        farmDTO.setFarmName(farm.getFarmName());
        farmDTO.setFarmExtend(farm.getFarmExtend());
        farmDTO.setFarmAddress(farm.getFarmAddress());
        farmDTO.setFarmWidth(farm.getFarmWidth());
        farmDTO.setFarmLength(farm.getFarmLength());
        return farmDTO;
    }

    @Override
    @Transactional
    public FarmDTO addFarm(FarmRequest farmRequest) {
        try {
            Farm farm = new Farm();

            farm.setFarmName(farmRequest.getFarmName());
            farm.setFarmExtend(farmRequest.getFarmExtend());
            farm.setFarmAddress(farmRequest.getFarmAddress());
            farm.setFarmWidth(farmRequest.getFarmWidth());
            farm.setFarmLength(farmRequest.getFarmLength());
            farm.setDeleted(false);
            farmRepository.save(farm);

            return transferDTO(farm);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    @Transactional
    public FarmDTO updateFarm(FarmRequest farmRequest, int id) {
        try {
            Farm farm = farmRepository.findByFarmId(id);
            farm.setFarmName(farmRequest.getFarmName());
            farm.setFarmExtend(farmRequest.getFarmExtend());
            farm.setFarmAddress(farmRequest.getFarmAddress());
            farm.setFarmLength(farmRequest.getFarmLength());
            farm.setFarmLength(farmRequest.getFarmLength());
            farmRepository.save(farm);

            return transferDTO(farm);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    @Transactional
    public FarmDTO deleteFarm(int id) {
        try {
            Farm farm = farmRepository.findByFarmId(id);
            farm.setDeleted(true);
            farmRepository.save(farm);
            return transferDTO(farm);
        } catch (Exception e) {
            return null;
        }
    }
}
