package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private ICityService cityService;
    //get all cities
    @GetMapping("/get")
    public List<City> getAllCity(){
        return cityService.getAllCities();
    }

    //get city by id
    @GetMapping("/get/{idCity}")
    public City getCityById(@PathVariable Integer idCity){
        return cityService.getCityById(idCity);
    }

    //create city
    @PostMapping("/create")
    public String createCity (@RequestBody City city){
        cityService.saveCity(city);
        return "Created City";
    }

    //delete city
    @DeleteMapping("/delete/{idCity}")
    public String deleteCity (@PathVariable Integer idCity){
        cityService.deleteCity(idCity);
        return "Deleted City";
    }

    //edit city
    @PutMapping("/edit")
    public City editCity(@RequestBody City city){
        cityService.editCity(city);
        return cityService.getCityById(city.getIdCity());
    }


}
