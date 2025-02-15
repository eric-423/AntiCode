package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Water;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaterRepository extends JpaRepository<Water, Integer> {
    Water findWaterById(int id);
}
