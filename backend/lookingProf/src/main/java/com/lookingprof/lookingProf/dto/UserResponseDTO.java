package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.Enum.Role;
import com.lookingprof.lookingProf.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponseDTO {

    private int idUser;
    private LocalDateTime createAt;
    private String address;
    private String email;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private String phone;
    private String profession;
    private String province;
    private String city;
    private String description;


    public UserResponseDTO(User user){
        this.idUser=user.getIdUser();
        this.createAt=user.getCreateAt();
        this.address= user.getAddress();
        this.email= user.getEmail();
        this.firstName= user.getFirstName();
        this.lastName= user.getLastName();
        this.imageUrl= user.getImageUrl();
        this.phone=user.getPhone();
        this.profession = user.getProfession() != null ? user.getProfession().getNameProfession() : null;
        this.province = user.getProvince() != null ? user.getProvince().getNameProvince() : null;
        this.city = user.getCity() != null ? user.getCity().getNameCity() : null;
        this.description = user.getDescription();
    }
}
