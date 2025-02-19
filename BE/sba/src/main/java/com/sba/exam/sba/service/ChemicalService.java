package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.ChemicalDTO;
import com.sba.exam.sba.entity.AgriculturalChemical;
import com.sba.exam.sba.entity.ChemicalType;
import com.sba.exam.sba.repository.ChemicalRepository;
import com.sba.exam.sba.repository.ChemicalTypeRepository;
import com.sba.exam.sba.service.imp.ChemicalServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ChemicalService implements ChemicalServiceImp {
    
    private final ChemicalRepository chemicalRepository;

    private final ChemicalTypeRepository chemicalTypeRepository;

    @Override
    public List<ChemicalDTO> findAll() {
        List<AgriculturalChemical> Chemicals = chemicalRepository.findAll();
        List<ChemicalDTO> dtos = new ArrayList<>();
        for (AgriculturalChemical a : Chemicals) {
            ChemicalDTO dto = new ChemicalDTO();
            dto.setId(a.getId());
            dto.setName(a.getName());
            dto.setDescription(a.getDescription());
            dto.setManufacturingDate(a.getManufacturingDate());
            dto.setExpirationDate(a.getExpirationDate());
            dto.setVolumeAvailable(a.getVolumeAvailable());
            dto.setChemicalType(a.getChemicalTypes().getTypeName());

            dtos.add(dto);
        }
        return dtos;
    }

    @Override
    public boolean delete(int id) {
        try {
            chemicalRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public ChemicalDTO createChemical(ChemicalDTO chemicalDTO, int TypeId) throws Exception {

        AgriculturalChemical chemical = new AgriculturalChemical();
        ChemicalType type = chemicalTypeRepository.findById(TypeId).orElseThrow(() -> new Exception("Type not found"));

        chemical.setName(chemicalDTO.getName());
        chemical.setDescription(chemicalDTO.getDescription());
        chemical.setManufacturingDate(chemicalDTO.getManufacturingDate());
        chemical.setExpirationDate(chemicalDTO.getExpirationDate());
        chemical.setVolumeAvailable(chemicalDTO.getVolumeAvailable());
        chemical.setChemicalTypes(type);
        chemicalRepository.save(chemical);
        chemicalDTO.setChemicalType(type.getTypeName());

        return chemicalDTO;
    }

    @Override
    public ChemicalDTO updateChemical(ChemicalDTO chemicalDTO, int typeId) throws Exception {
        AgriculturalChemical chemical = chemicalRepository.findById(chemicalDTO.getId()).orElseThrow(() -> new Exception("Chemical not found"));
        ChemicalType type = chemicalTypeRepository.findById(typeId).orElseThrow(() -> new Exception("Type not found"));
        chemical.setName(chemicalDTO.getName());
        chemical.setDescription(chemicalDTO.getDescription());
        chemical.setManufacturingDate(chemicalDTO.getManufacturingDate());
        chemical.setExpirationDate(chemicalDTO.getExpirationDate());
        chemical.setVolumeAvailable(chemicalDTO.getVolumeAvailable());
        chemical.setChemicalTypes(type);
        chemicalRepository.save(chemical);
        chemicalDTO.setChemicalType(type.getTypeName());

        return chemicalDTO;
    }
}
