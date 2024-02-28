package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.dto.ProfessionResponseDTO;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.service.IProffesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/profession")
public class ProfessionController {

    @Autowired
    private IProffesionService proffesionService;

    //get all professionals
    @GetMapping("/get")
    public ResponseEntity<?> getAllProfessionals(){
        Optional<List<ProfessionResponseDTO>> listOptional = proffesionService.getAllProfessions();
        if(listOptional.isPresent()){
            return ResponseEntity.ok(listOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron profesiones");
        }
    }

    //find professional by id
    @GetMapping("/get/{idProfession}")
    public ProfessionResponseDTO findProfession(@PathVariable Integer idProfession){
        ProfessionResponseDTO professionResponseDTO = proffesionService.getProfessionDTOById(idProfession);
        return professionResponseDTO;
    }
    //create profession
    @PostMapping("/create")
    public String createProfession (@RequestBody Profession profession){
        proffesionService.saveProfession(profession);
        return "Created Profession";
    }

    //delete profession
    @DeleteMapping("/delete/{idProfession}")
    public String deleteProfession (@PathVariable Integer idProfession){
        proffesionService.deleteProfession(idProfession);
        return "Deleted Profession";
    }

    //edit profession
    @PutMapping("/edit")
    public Profession editProfession(@RequestBody Profession profession){
        proffesionService.editProfession(profession);
        return proffesionService.findProfessionById(profession.getIdProfession());
    }
}
