package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Province;

import java.util.List;

public interface ICityService {

    //get city
    public List<City> getAllCities();

    //get city by id
    public City getCityById(Integer idCity);

    //create city
    public void saveCity(City city);

    //delete city
    public void deleteCity(Integer idCity);

    //edit city
    public void editCity(City city);

}
