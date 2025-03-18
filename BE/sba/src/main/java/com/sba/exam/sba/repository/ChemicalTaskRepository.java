package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.TaskAgriculturalChemical;
import com.sba.exam.sba.entity.keys.KeyTaskAgriculturalChemical;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChemicalTaskRepository extends JpaRepository<TaskAgriculturalChemical, KeyTaskAgriculturalChemical> {
}
