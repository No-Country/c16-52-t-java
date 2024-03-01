package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.Province;

import java.util.List;

public interface IProvincesService {

    //get provinces
    public List<Province> getAllProvinces();

    //get province by id
    public Province getProvinceById(Integer idProvince);

    //create province
    public void saveProvince(Province provinces);

    //delete province
    public void deleteProvince(Integer idProvince);

    //edit province
    public void editProvince(Province provinces);

}
