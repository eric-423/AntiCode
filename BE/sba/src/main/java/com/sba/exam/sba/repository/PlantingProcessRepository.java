package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.PlantingProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantingProcessRepository extends JpaRepository<PlantingProcess, Integer> {
}
