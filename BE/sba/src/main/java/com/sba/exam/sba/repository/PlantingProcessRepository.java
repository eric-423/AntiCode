package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.PlantingProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantingProcessRepository extends JpaRepository<PlantingProcess, Integer> {
    List<PlantingProcess> findByPlant_PlantId(int plantId);

}
