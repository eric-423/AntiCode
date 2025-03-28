package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.AgriculturalChemical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChemicalRepository extends JpaRepository<AgriculturalChemical, Integer> {
    List<AgriculturalChemical> findByDeletedFalse();


}
