package com.sba.exam.sba.repository;


import com.sba.exam.sba.entity.PlantingLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantingLocationRepository extends JpaRepository<PlantingLocation,Integer> {
    PlantingLocation findByPlantLocationId(int plantLocationId);


}
