package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.model.Advertisement;
import com.lookingprof.lookingProf.service.IAdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/advertisement")
public class AdvertisementController {

    @Autowired
    private IAdvertisementService advertisementService;

    //get all advertisements
    @GetMapping("/get")
    public List<Advertisement> getAllAdvertisements(){
        return advertisementService.getAllAdvertisements();
    }

    //get advertisement by id
    @GetMapping("/get/{idAdvertisement}")
    public Advertisement findAdvertisementById(@PathVariable Integer idAdvertisement){
        return advertisementService.findAdvertisementById(idAdvertisement);
    }

    //create advertisement
    @PostMapping("/create")
    public String createAdvertisement (@RequestBody Advertisement advertisement){
        advertisementService.saveAdvertisement(advertisement);
        return "Created Advertisement";
    }

    //delete advertisement
    @DeleteMapping("/delete/{idAdvertisement}")
    public String deleteAdvertisement (@PathVariable Integer idAdvertisement){
        advertisementService.deleteAdvertisement(idAdvertisement);
        return "Deleted Advertisement";
    }

    //edit advertisement
    @PutMapping("/edit")
    public Advertisement editAdvertisement(@RequestBody Advertisement advertisement){
        advertisementService.editAdvertisement(advertisement);
        return advertisementService.findAdvertisementById(advertisement.getIdAdvertisement());
    }

}
