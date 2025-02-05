package com.sba.exam.sba.repository;


import com.sba.exam.sba.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmRepository extends JpaRepository<Farm,Integer> {
    Farm findByFarmId(int farmId);

}
