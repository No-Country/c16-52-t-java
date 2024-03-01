package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.service.IProvincesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/provinces")
public class ProvinceController {

    @Autowired
    private IProvincesService provincesService;

    //get all provinces
    @GetMapping("/get")
    public List<Province> getAllProvinces(){
        return provincesService.getAllProvinces();
    }

    //get province by id
    @GetMapping("/get/{idProvince}")
    public Province getProvinceById (@PathVariable Integer idProvince){
        return provincesService.getProvinceById(idProvince);
    }

    @PostMapping("/create")
    public String saveProvince(@RequestBody Province province){
        provincesService.saveProvince(province);
        return "Created Province";
    }

    @DeleteMapping("/delete/{idProvince}")
    public String deleteProvince (@PathVariable Integer idProvince){
        provincesService.deleteProvince(idProvince);
        return "Deleted Province";
    }

    @PutMapping("/edit")
    public Province editProvince (@RequestBody Province province){
        provincesService.editProvince(province);
        return provincesService.getProvinceById(province.getIdProvince());
    }

}
