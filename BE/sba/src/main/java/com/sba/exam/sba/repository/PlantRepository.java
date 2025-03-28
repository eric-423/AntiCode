package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Plant;
import com.sba.exam.sba.entity.PlantType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Integer> {

    Plant findByPlantId(int plantId);

    Plant findByPlantName(String plantName);

    List<Plant> findByDeletedFalse();


}
