package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.PlantType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantTypeRepository extends JpaRepository<PlantType, Integer> {
    List<PlantType> findByIsDeleted(boolean isDeleted);

}
