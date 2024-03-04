package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.dto.CityDTO;
import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.service.CityService;
import com.lookingprof.lookingProf.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private CityService cityService;
    //get all cities
    @GetMapping("/get")
    public ResponseEntity<?> getAllCity(){
        Optional<List<CityDTO>> listOptional = cityService.getAllCities();
        if(listOptional.isPresent()){
            return ResponseEntity.ok(listOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron ciudades");
        }
    }

    //get cityDTO by id
    @GetMapping("/get/{idCity}")
    public CityDTO getCityById(@PathVariable Integer idCity){
        CityDTO cityDTO = cityService.getCityDTOById(idCity);
        return cityDTO;
    }



}
