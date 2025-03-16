package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Water;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface WaterRepository extends JpaRepository<Water, Integer> {
    Water findWaterById(int id);

    Water getWaterById(int id);
}
