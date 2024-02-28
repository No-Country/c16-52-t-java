package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Profession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionResponseDTO {

    private int idProfession;
    private String nameProfession;

    public ProfessionResponseDTO (Profession profession){
        this.idProfession=profession.getIdProfession();
        this.nameProfession=profession.getNameProfession();
    }

}
