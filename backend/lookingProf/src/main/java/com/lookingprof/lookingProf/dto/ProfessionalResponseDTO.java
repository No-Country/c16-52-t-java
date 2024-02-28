package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.model.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalResponseDTO {
    //id
    private Integer id;
    //direccion
    private String country;
    private Province province;
    private City city;
    //descripcion
    private String description;
    //profesion
    private Profession profession;
    //promedio de calificaciones
    private Integer qualification;
    //nombre y apellido
    private String firstName;
    private String lastName;
    //imagen de perfil
    private String imageURL;

    public ProfessionalResponseDTO(User user){
        this.id = user.getIdUser();
        this.country = user.getCountry();
        this.province = user.getProvince();
        this.city = user.getCity();
        this.description = user.getDescription();
        this.profession = user.getProfession();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.imageURL = user.getImageUrl();
        this.qualification = user.getQualification();
    }




}
