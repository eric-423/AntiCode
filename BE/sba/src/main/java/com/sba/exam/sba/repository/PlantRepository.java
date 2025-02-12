package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Integer> {

    Plant findByPlantId(int plantId);

    Plant findByPlantName(String plantName);
}
