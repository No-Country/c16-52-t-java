package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.Advertisement;
import com.lookingprof.lookingProf.repository.IAdvertisementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvertisementService implements IAdvertisementService {

    @Autowired
    private IAdvertisementRepository advertisementRepository;

    @Override
    public List<Advertisement> getAllAdvertisements() {
        return advertisementRepository.findAll();
    }

    @Override
    public Advertisement findAdvertisementById(Integer idAdvertisement) {
        return advertisementRepository.findById(idAdvertisement).orElse(null);
    }

    @Override
    public void saveAdvertisement(Advertisement advertisement) {
        advertisementRepository.save(advertisement);
    }

    @Override
    public void deleteAdvertisement(Integer idAdvertisement) {
        advertisementRepository.deleteById(idAdvertisement);
    }

    @Override
    public void editAdvertisement(Advertisement advertisement) {
        this.saveAdvertisement(advertisement);
    }
}
