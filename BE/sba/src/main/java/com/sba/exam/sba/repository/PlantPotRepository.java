package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.PlantPot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantPotRepository extends JpaRepository<PlantPot,Integer> {
    PlantPot findByPotId(int potId);
}
