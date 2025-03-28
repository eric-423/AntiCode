package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Area;
import com.sba.exam.sba.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location,Integer> {
    Location findByLocationId(int locationId);

    List<Location> findLocationByArea_AreaId(int areaId);

    int countLocationsByArea_AreaId(int areaAreaId);

    @Query("select count(*) from Location l WHERE l.isPlanted =:planted and l.area.areaId =:areaId")
    int countLocationsByPlantedAndArea_AreaId(@Param("planted") boolean planted, @Param("areaId") int areaId);

}
