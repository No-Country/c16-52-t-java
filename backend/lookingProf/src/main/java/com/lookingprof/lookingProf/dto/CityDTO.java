package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityDTO {
    private int idCity;
    private String nameCity;
    private Integer idProvince;

    public CityDTO (City city){
        this.idCity=city.getIdCity();
        this.nameCity=city.getNameCity();
        this.idProvince=city.getProvince().getIdProvince();
    }

}
