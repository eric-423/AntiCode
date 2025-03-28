package com.sba.exam.sba.repository;


import com.sba.exam.sba.entity.PlantingLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantingLocationRepository extends JpaRepository<PlantingLocation,Integer> {
    PlantingLocation findByPlantLocationId(int plantLocationId);

    @Query("SELECT DISTINCT pl.plans FROM PlantingLocation pl")
    List<Long> getDistinctPlans();


    List<PlantingLocation> findByIsDeleted(boolean b);

    PlantingLocation findFirstByPlans(long plans);

    List<PlantingLocation> getPlantingLocationsByPlans(long plans);
}
