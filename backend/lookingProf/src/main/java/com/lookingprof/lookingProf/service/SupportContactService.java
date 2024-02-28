package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.Publication;
import com.lookingprof.lookingProf.model.SupportContact;
import com.lookingprof.lookingProf.repository.ISupportContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupportContactService {
    private final ISupportContactRepository supportContactRepository;


    public List<SupportContact> getAllSupportContact(){
        return supportContactRepository.findAll();
    }

    //get SupportContact by id
    public SupportContact findSupportContactById(Integer idSupportContact){
        return supportContactRepository.findById(idSupportContact).orElse(null);
    }

    //create SupportContact
    public void saveSupportContact(SupportContact supportContact){
        supportContactRepository.save(supportContact);
    }

    //delete SupportContact by id
    public void deleteSupportContact(Integer idSupportContact){
        supportContactRepository.deleteById(idSupportContact);
    }

    //edit SupportContact
    public void editSupportContact(SupportContact supportContact){
        this.saveSupportContact(supportContact);
    }


}
