package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location,Integer> {
    Location findByLocationId(int locationId);


}
