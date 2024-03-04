package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.dto.ProfessionResponseDTO;
import com.lookingprof.lookingProf.model.Profession;

import java.util.List;
import java.util.Optional;

public interface IProffesionService {

    //get profession
    public Optional<List<ProfessionResponseDTO>> getAllProfessions();

    //get proffesion by id
    public Profession findProfessionById(Integer idProfession);

    //create profession
    public void saveProfession(Profession profession);

    //delete profession
    public void deleteProfession(Integer idProfession);

    //edit profession
    public void editProfession (Profession profession);

    public ProfessionResponseDTO getProfessionDTOById(Integer idProfession);


    Profession getProfessionByName(String profession);

    Profession getById(Integer id);
}
