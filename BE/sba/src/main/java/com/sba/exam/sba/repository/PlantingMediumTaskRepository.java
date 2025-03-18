package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.PlantMedium;
import com.sba.exam.sba.entity.PlantMediumTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantingMediumTaskRepository extends JpaRepository<PlantMediumTask, Integer>{
    PlantMediumTask findByPlantMedium_MediumIdAndPlantingProcess_Id(int mediumId, int id);

}
