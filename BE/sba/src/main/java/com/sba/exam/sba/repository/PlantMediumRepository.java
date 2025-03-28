package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.PlantMedium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantMediumRepository extends JpaRepository<PlantMedium, Integer>{
    PlantMedium findByMediumId(int mediumId);

    List<PlantMedium> findByIsDeleted(boolean isDeleted);


}
