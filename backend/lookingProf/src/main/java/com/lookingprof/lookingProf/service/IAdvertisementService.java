package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.Advertisement;
import com.lookingprof.lookingProf.model.Profession;

import java.util.List;

public interface IAdvertisementService {

    //get advertisements
    public List<Advertisement> getAllAdvertisements();

    //get advertisement by id
    public Advertisement findAdvertisementById(Integer idAdvertisement);

    //create advertisement
    public void saveAdvertisement(Advertisement advertisement);

    //delete advertisement
    public void deleteAdvertisement(Integer idAdvertisement);

    //edit advertisement
    public void editAdvertisement (Advertisement advertisement);

}
