package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.LocationDTO;
import com.sba.exam.sba.dto.PlantingLocationDTO;
import com.sba.exam.sba.entity.Location;
import com.sba.exam.sba.payload.request.LocationRequest;

import java.util.List;

public interface LocationServiceImp {
    List<LocationDTO> getAllLocation();

    LocationDTO getLocationById(int id);

    LocationDTO addLocation(LocationRequest locationRequest);

    LocationDTO updateLocation(LocationRequest locationRequest, int id);

    LocationDTO deleteLocation(int id);
    public List<LocationDTO> getAllLocationAvailable(Integer locationId);

    List<LocationDTO> getLocationByArea_AreaId(int areaId);
}
