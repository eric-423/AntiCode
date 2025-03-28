package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.EquipmentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Integer> {
    List<EquipmentType> findByIsDeletedFalse();

}
