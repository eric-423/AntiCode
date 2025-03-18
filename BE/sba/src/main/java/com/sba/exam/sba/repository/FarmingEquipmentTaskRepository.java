package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.FarmingEquipmentTask;
import com.sba.exam.sba.entity.keys.KeyFarmingEquipmentTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmingEquipmentTaskRepository extends JpaRepository<FarmingEquipmentTask, KeyFarmingEquipmentTask> {
}
