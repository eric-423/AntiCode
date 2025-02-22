package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.ChemicalDTO;

import java.util.List;

public interface ChemicalServiceImp {
    List<ChemicalDTO> findAll();

    boolean delete(int id);

    ChemicalDTO createChemical(ChemicalDTO chemicalDTO, int typeId) throws Exception;

    ChemicalDTO updateChemical(ChemicalDTO chemicalDTO, int typeId) throws Exception;
}
