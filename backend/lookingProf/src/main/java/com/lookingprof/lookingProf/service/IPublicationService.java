package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.model.Publication;

import java.util.List;

public interface IPublicationService {
    public List<Publication> getAllPublication();

    //get publication by id
    public Publication findById(Integer idPublication);

    //create publication
    public void savePublication(Publication publication);

    //delete publication by id
    public void deletePublication(Integer idPublication);

    //edit publication
    public void editPublication(Publication publication);
}
