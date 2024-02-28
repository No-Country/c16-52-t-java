package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.repository.ICityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService{

    @Autowired
    private ICityRepository cityRepository;
    @Override
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    @Override
    public City getCityById(Integer idCity) {
        return cityRepository.findById(idCity).orElse(null);
    }
    @Override
    public void saveCity(City city) {
        cityRepository.save(city);
    }

    @Override
    public void deleteCity(Integer idCity) {
        cityRepository.deleteById(idCity);
    }

    @Override
    public void editCity(City city) {
        this.saveCity(city);
    }
}
