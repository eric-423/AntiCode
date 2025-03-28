package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.FarmingEquipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FarmingEquipmentRepository extends JpaRepository<FarmingEquipment, Integer> {
    List<FarmingEquipment> findByEquipmentType_IsDeleted(boolean isDeleted);

}
