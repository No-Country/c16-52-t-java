package com.lookingprof.lookingProf.controller;




import com.lookingprof.lookingProf.service.PublicationService;
import lombok.RequiredArgsConstructor;
import com.lookingprof.lookingProf.model.Publication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Service
@RestController
@RequiredArgsConstructor
@RequestMapping("/publication")
public class PublicationController {


    private final PublicationService publicationService;

    @GetMapping("/get")
    public List<Publication> getAllPublication(){
        return publicationService.getAllPublication();
    }

    @GetMapping("/get/{idPublication}")
    public Publication getPublicationById(@PathVariable Integer idPublication){
        return publicationService.findPublicationById(idPublication);
    }


    @PostMapping("/create")
    public String createPublication (@RequestBody Publication publication){
        publicationService.savePublication(publication);
        return "Created Publication";
    }

    @DeleteMapping("/delete/{idPublication}")
    public String deletePublication (@PathVariable Integer idPublication){
        publicationService.deletePublication(idPublication);
        return "Deleted Publication";
    }


    //modificar el metodo edit y pasae el id por la url
    @PutMapping("/edit")
    public Publication editPublication(@RequestBody Publication publication){
        publicationService.editPublication(publication);
        return publicationService.findPublicationById(publication.getId());
    }
}
