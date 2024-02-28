package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.Enum.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRequestDTO {
//aca van los campos para editar y crear el usuario
    private String lastName;
    private String firstName;
    private int province;
    private String city;
    private String phone;
    private Integer qualification;
    private int profession;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String description;

}
