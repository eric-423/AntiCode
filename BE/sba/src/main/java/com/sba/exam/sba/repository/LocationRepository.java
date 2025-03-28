package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Area;
import com.sba.exam.sba.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location,Integer> {
    Location findByLocationId(int locationId);

    List<Location> findLocationByArea_AreaId(int areaId);

    List<Location> findByIsDeleted(boolean isDeleted);


}
