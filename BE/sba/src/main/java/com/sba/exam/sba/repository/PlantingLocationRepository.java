package com.sba.exam.sba.repository;


import com.sba.exam.sba.entity.PlantingLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantingLocationRepository extends JpaRepository<PlantingLocation,Integer> {
    PlantingLocation findByPlantLocationId(int plantLocationId);

    List<PlantingLocation> findByIsDeleted(boolean isDeleted);



}
