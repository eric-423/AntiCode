package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.LocationDTO;
import com.sba.exam.sba.dto.PlantingLocationDTO;
import com.sba.exam.sba.entity.Area;
import com.sba.exam.sba.entity.Location;
import com.sba.exam.sba.entity.PlantingLocation;
import com.sba.exam.sba.payload.request.LocationRequest;
import com.sba.exam.sba.repository.AreaRepository;
import com.sba.exam.sba.repository.LocationRepository;
import com.sba.exam.sba.service.imp.AreaServiceImp;
import com.sba.exam.sba.service.imp.LocationServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService implements LocationServiceImp {


    @Autowired
    LocationRepository locationRepository;

    @Autowired
    AreaRepository areaRepository;

    @Autowired
    AreaServiceImp areaServiceImp;

    @Override
    public List<LocationDTO> getAllLocation() {
        List<Location> locations = locationRepository.findAll();

        List<LocationDTO> result = new ArrayList<>();

        for(Location location : locations){

            result.add(transferDTO(location));
        }

        return result;
    }

    @Override
    public LocationDTO getLocationById(int id) {

        Location location = locationRepository.findByLocationId(id);

        return transferDTO(location);
    }

    @Override
    @Transactional
    public LocationDTO addLocation(LocationRequest locationRequest) {
        try {
            Area area = areaRepository.findByAreaId(locationRequest.getAreaId());
            Location location = new Location();
            location.setLocationExtent(locationRequest.getLocationExtend());
            location.setLocationName(locationRequest.getLocationName());
            location.setLocationWidth(locationRequest.getLocationWidth());
            location.setLocationLength(locationRequest.getLocationLength());
            location.setArea(area);

            locationRepository.save(location);

            return getLocationById(location.getLocationId());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    @Transactional
    public LocationDTO updateLocation(LocationRequest locationRequest, int id) {
        try {
            Location location = locationRepository.findByLocationId(id);
            Area area = areaRepository.findByAreaId(locationRequest.getAreaId());

            location.setLocationName(locationRequest.getLocationName());
            location.setLocationExtent(locationRequest.getLocationExtend());
            location.setLocationWidth(locationRequest.getLocationWidth());
            location.setLocationLength(locationRequest.getLocationLength());
            location.setArea(area);
            locationRepository.save(location);
            return getLocationById(location.getLocationId());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public LocationDTO deleteLocation(int id) {
        try {
            Location location = locationRepository.findByLocationId(id);
            LocationDTO locationDTO = getLocationById(location.getLocationId());

            locationRepository.delete(location);

            return locationDTO;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<LocationDTO> getAllLocationAvailable(Integer id) {
        List<Location> locations = locationRepository.findAll();
        List<LocationDTO> result = new ArrayList<>();
        for(Location location : locations){
            if(id!=null){
                if(location.getLocationId() == id){
                    result.add(transferDTO(location));
                }
            }
            if(checkLocationAvailable(location)){
                result.add(transferDTO(location));
            }
        }
        return result;
    }

    @Override
    public List<LocationDTO> getLocationByArea_AreaId(int areaId) {
        try{
            List<Location> locationList = locationRepository.findLocationByArea_AreaId(areaId);
            List<LocationDTO> result = new ArrayList<>();
            for(Location location : locationList){
                result.add(transferDTO(location));
            }
            return result;
        }catch(Exception e){
            return null;
        }
    }

    public LocationDTO transferDTO(Location location){
        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setLocationId(location.getLocationId());
        locationDTO.setLocationName(location.getLocationName());
        locationDTO.setLocationExtent(location.getLocationExtent());
        locationDTO.setLocationLength(location.getLocationLength());
        locationDTO.setLocationWidth(location.getLocationWidth());

        locationDTO.setArea(areaServiceImp.getAreaById(location.getArea().getAreaId()));
        return locationDTO;
    }



    private boolean checkLocationAvailable(Location location){
        try {
            List<PlantingLocation> plantingLocations = location.getPlantingLocationList();

            if (plantingLocations.size() == 0) {
                return true;
            }
            PlantingLocation plantingLocation = plantingLocations.getLast();
            if(plantingLocation.isDeleted()){
                return true;
            }
            return plantingLocation.isHarvest();
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }

    }

}
