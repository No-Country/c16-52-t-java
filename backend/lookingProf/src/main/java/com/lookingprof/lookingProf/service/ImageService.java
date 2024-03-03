package com.lookingprof.lookingProf.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageService {

    //SETEO LA RUTA DONDE SE ALMACENARAN LAS IMAGENES DEL PERFIL DEL USUARIO
    private static final String ABSOLUTE_PATH = "C://Users//54375//Documents//LookingProfImgs";

    public String copyProfileImg(String oldImageUrl, MultipartFile image){
        try{
            Files.delete(Paths.get(ABSOLUTE_PATH , oldImageUrl).toAbsolutePath());
            String photoName = image.getOriginalFilename();
            Path photoPath = Paths.get(ABSOLUTE_PATH, photoName).toAbsolutePath();
            Files.copy(image.getInputStream(), photoPath, StandardCopyOption.REPLACE_EXISTING);
            return photoName;
        }catch (Exception e){
            e.printStackTrace();
            throw new IllegalArgumentException("Error saving image");
        }
    }

}
