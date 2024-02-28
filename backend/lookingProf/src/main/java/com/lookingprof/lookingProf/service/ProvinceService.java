package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.dto.CityDTO;
import com.lookingprof.lookingProf.dto.ProvinceResponseDTO;
import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.repository.IProvincesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProvinceService implements IProvincesService {

    @Autowired
    private IProvincesRepository provincesRepository;

    @Override
    public Optional<List<ProvinceResponseDTO>> getAllProvinces() {

        List<Province> provinceList = provincesRepository.findAll();
        List<ProvinceResponseDTO> listProvinceDto = new ArrayList<>();
        if(provinceList.isEmpty()){
            return Optional.empty();
        } else {

            provinceList.forEach (province -> {
                ProvinceResponseDTO provinceDTO = new ProvinceResponseDTO(province);
                listProvinceDto.add(provinceDTO);
            } );
        }
        return Optional.of(listProvinceDto);

    }

    @Override
    public Province getProvinceById(Integer idProvince) {
        return provincesRepository.findById(idProvince).orElse(null);
    }

    @Override
    public ProvinceResponseDTO getProvinceDtoById(Integer idProvince) {
        ProvinceResponseDTO provinceResponseDTO = new ProvinceResponseDTO(provincesRepository.findById(idProvince).get());
        return provinceResponseDTO;
    }
}
