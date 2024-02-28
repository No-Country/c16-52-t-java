package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.dto.ProvinceResponseDTO;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.service.IProvincesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/provinces")
public class ProvinceController {

    @Autowired
    private IProvincesService provincesService;

    //get all provincesDTO
    @GetMapping("/get")
    public ResponseEntity<?> getAllProvinces(){
        Optional<List<ProvinceResponseDTO>> listOptional = provincesService.getAllProvinces();
        if(listOptional.isPresent()){
            return ResponseEntity.ok(listOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron provincias");
        }
    }

    //get provinceDTO by id
    @GetMapping("/get/{idProvince}")
    public ProvinceResponseDTO getProvinceById (@PathVariable Integer idProvince){
        ProvinceResponseDTO provinceResponseDTO = provincesService.getProvinceDtoById(idProvince);
        return provinceResponseDTO;
    }


}
