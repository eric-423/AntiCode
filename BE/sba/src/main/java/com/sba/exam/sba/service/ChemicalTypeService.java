package com.sba.exam.sba.service;


import com.sba.exam.sba.dto.ChemicalDTO;
import com.sba.exam.sba.dto.ChemicalTypeDTO;
import com.sba.exam.sba.entity.ChemicalType;
import com.sba.exam.sba.repository.ChemicalTypeRepository;
import com.sba.exam.sba.service.imp.ChemicalTypeImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChemicalTypeService implements ChemicalTypeImp {


    @Autowired
    ChemicalTypeRepository chemicalTypeRepository;


    @Override
    public List<ChemicalTypeDTO> getAllChemicalType() {

        List<ChemicalTypeDTO> list = new ArrayList<>();

        List<ChemicalType> types = chemicalTypeRepository.findByIsDeleted(false);

        for (ChemicalType type : types) {
            ChemicalTypeDTO dto = new ChemicalTypeDTO();
            dto.setId(type.getTypeId());
            dto.setName(type.getTypeName());
            dto.setDeleted(type.isDeleted());
            dto.setDescription(type.getTypeDescription());
            list.add(dto);
        }
        return list;
    }

    @Override
    public ChemicalTypeDTO createChemicalType(ChemicalTypeDTO dto) {
        ChemicalType type = new ChemicalType();
        type.setTypeName(dto.getName());
        type.setTypeDescription(dto.getDescription());
        type.setDeleted(false);
        chemicalTypeRepository.save(type);
        return dto;
    }

    @Override
    public ChemicalTypeDTO deleteChemicalType(int id) {
        ChemicalType type = chemicalTypeRepository.findById(id).get();
        type.setDeleted(true);
        chemicalTypeRepository.save(type);

        ChemicalTypeDTO dto = new ChemicalTypeDTO();
        dto.setId(type.getTypeId());
        dto.setName(type.getTypeName());
        dto.setDescription(type.getTypeDescription());
        dto.setDeleted(type.isDeleted());
        return dto;
    }

    @Override
    public ChemicalTypeDTO updateChemicalType(ChemicalTypeDTO dto) {
        ChemicalType type = chemicalTypeRepository.findById(dto.getId()).get();
        type.setTypeName(dto.getName());
        type.setTypeDescription(dto.getDescription());
        chemicalTypeRepository.save(type);
        return dto;
    }
}
