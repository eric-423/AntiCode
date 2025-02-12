package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.LocationDTO;
import com.sba.exam.sba.entity.Location;
import com.sba.exam.sba.repository.LocationRepository;
import com.sba.exam.sba.service.imp.LocationServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService implements LocationServiceImp {


    @Autowired
    LocationRepository locationRepository;

    @Override
    public List<LocationDTO> getAllLocation() {
        List<Location> locations = locationRepository.findAll();

        List<LocationDTO> result = new ArrayList<>();

        for(Location location : locations){
            LocationDTO locationDTO = new LocationDTO();
            locationDTO.setLocationId(location.getLocationId());
            locationDTO.setLocationName(location.getLocationName());
            locationDTO.setLocationExtent(location.getLocationExtent());

            result.add(locationDTO);
        }

        return result;
    }
}
