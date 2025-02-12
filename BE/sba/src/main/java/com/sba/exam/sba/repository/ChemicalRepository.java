package com.sba.exam.sba.repository;

import com.sba.exam.sba.dto.ChemicalDTO;
import com.sba.exam.sba.entity.AgriculturalChemical;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChemicalRepository extends JpaRepository<AgriculturalChemical, Integer> {

}
