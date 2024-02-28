package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.model.SupportContact;
import com.lookingprof.lookingProf.service.SupportContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
@RequiredArgsConstructor
@RequestMapping("/supportContact")
public class SupportContactController {

    private final SupportContactService supportContactService;

    @GetMapping("/get")
    public List<SupportContact> getAllSupportContact(){
        return supportContactService.getAllSupportContact();
    }
    @GetMapping("/get/{idSupportContact}")
    public SupportContact getSupportContactById( @PathVariable Integer idSupportContact){
        return supportContactService.findSupportContactById(idSupportContact);
    }

    @PostMapping("/create")
    public String createSupportContact( @RequestBody SupportContact supportContact){
        supportContactService.saveSupportContact(supportContact);
        return "Create SupportContact";
    }

    @DeleteMapping("/delete/{idSupportContact}")
    public String deleteSupportContact(@PathVariable Integer idSupportContact){
        supportContactService.deleteSupportContact(idSupportContact);
        return "Delete SupportContact";
    }

    @PutMapping("/edit")
    public SupportContact editSupportContact(@RequestBody SupportContact supportContact){
        supportContactService.editSupportContact(supportContact);
        return supportContactService.findSupportContactById(supportContact.getIdSuportContact());
    }

}
