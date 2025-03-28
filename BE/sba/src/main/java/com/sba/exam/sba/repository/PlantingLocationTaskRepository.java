package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.PlantingLocationTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantingLocationTaskRepository extends JpaRepository<PlantingLocationTask, Integer> {
}
