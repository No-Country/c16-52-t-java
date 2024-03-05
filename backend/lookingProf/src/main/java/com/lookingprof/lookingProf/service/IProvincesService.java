package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.dto.ProvinceResponseDTO;
import com.lookingprof.lookingProf.model.Province;

import java.util.List;
import java.util.Optional;

public interface IProvincesService {

    //get provinces
    public Optional<List<ProvinceResponseDTO>> getAllProvinces();

    //get province by id
    public Province getProvinceById(Integer idProvince);

    //get provinceDTO by ID
    public ProvinceResponseDTO getProvinceDtoById(Integer idProvince);

    Province getProvinceByName(String province);
}
