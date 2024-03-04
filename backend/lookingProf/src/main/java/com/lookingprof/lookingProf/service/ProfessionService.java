package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.dto.ProfessionResponseDTO;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.repository.IProfessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessionService implements IProffesionService {

    @Autowired
    private IProfessionRepository professionRepository;

    @Override
    public Optional<List<ProfessionResponseDTO>> getAllProfessions() {
        List<Profession> professionList = professionRepository.findAll();
        List<ProfessionResponseDTO> listProfessionDTO = new ArrayList<>();
        if(professionList.isEmpty()){
            return Optional.empty();
        } else {
            professionList.forEach(profession -> {
                ProfessionResponseDTO professionResponseDTO = new ProfessionResponseDTO(profession);
                listProfessionDTO.add(professionResponseDTO);
            });
        }
        return Optional.of(listProfessionDTO);
    }

    @Override
    public Profession findProfessionById(Integer idProfession) {
        return professionRepository.findById(idProfession).orElse(null);
    }

    @Override
    public void saveProfession(Profession profession) {
        professionRepository.save(profession);
    }

    @Override
    public void deleteProfession(Integer idProfession) {
        professionRepository.deleteById(idProfession);
    }

    @Override
    public void editProfession(Profession profession) {
        this.saveProfession(profession);
    }

    @Override
    public ProfessionResponseDTO getProfessionDTOById(Integer idProfession) {
        ProfessionResponseDTO professionResponseDTO = new ProfessionResponseDTO(professionRepository.findById(idProfession).get());
        return professionResponseDTO;
    }

    @Override
    public Profession getProfessionByName(String profession) {
        return professionRepository.findByNameProfession(profession);
    }

    @Override
    public Profession getById(Integer id) {
        return professionRepository.findById(id).get();
    }
}
