package com.sba.exam.sba.service;


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

        List<ChemicalType> types = chemicalTypeRepository.findAll();

        for (ChemicalType type : types) {
            ChemicalTypeDTO dto = new ChemicalTypeDTO();
            dto.setId(type.getTypeId());
            dto.setName(type.getTypeName());
            dto.setDescription(type.getTypeDescription());
            list.add(dto);
        }

        return list;
    }
}
