package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Province;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProvinceResponseDTO {
    private int idProvince;
    private String nameProvince;
    public ProvinceResponseDTO (Province province){
        this.idProvince=province.getIdProvince();
        this.nameProvince=province.getNameProvince();
    }
}
