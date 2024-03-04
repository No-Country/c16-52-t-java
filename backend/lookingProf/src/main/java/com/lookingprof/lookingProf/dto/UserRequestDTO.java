package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.Enum.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRequestDTO {
//aca van los campos para editar y crear el usuario
    private String province;
    private String city;
    private String profession;
    private String role;
    private String description;
    private MultipartFile image;

}
