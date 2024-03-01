package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.repository.IProvincesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceService implements IProvincesService {

    @Autowired
    private IProvincesRepository provincesRepository;

    @Override
    public List<Province> getAllProvinces() {
        return provincesRepository.findAll();
    }

    @Override
    public Province getProvinceById(Integer idProvince) {
        return provincesRepository.findById(idProvince).orElse(null);
    }

    @Override
    public void saveProvince(Province provinces) {
        provincesRepository.save(provinces);
    }

    @Override
    public void deleteProvince(Integer idProvince) {
        provincesRepository.deleteById(idProvince);
    }

    @Override
    public void editProvince(Province provinces) {
        this.saveProvince(provinces);
    }
}
