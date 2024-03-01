package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.Publication;
import com.lookingprof.lookingProf.repository.IPublicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicationService {
    private final IPublicationRepository publicationRepository;

    public List<Publication> getAllPublication(){
        return publicationRepository.findAll();
    }


    public Publication findPublicationById(Integer idPublication){
        return publicationRepository.findById(idPublication).orElse(null);
    }

    public void savePublication(Publication publication){
        publicationRepository.save(publication);
    }

    public void deletePublication(Integer idPublication){
        publicationRepository.deleteById(idPublication);
    }

    public void editPublication(Publication publication){
        this.savePublication(publication);
    }

}
