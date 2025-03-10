package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area,Integer> {
    Area findByAreaId(int areaId);

    List<Area> findByIsDeleted(boolean isDeleted);


}
