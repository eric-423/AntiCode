package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.ChemicalTypeDTO;

import java.util.List;

public interface ChemicalTypeImp {

    List<ChemicalTypeDTO> getAllChemicalType();

    ChemicalTypeDTO createChemicalType(ChemicalTypeDTO dto);

    ChemicalTypeDTO deleteChemicalType(int id);

    ChemicalTypeDTO updateChemicalType(ChemicalTypeDTO dto);

}
