package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {

    private int idUser;
    private LocalDateTime createAt;
    private String address;
    private String email;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private String phone;
    private Boolean isActive;

    public UserResponseDTO (User user){
        this.idUser=user.getIdUser();
        this.createAt=user.getCreateAt();
        this.address= user.getAddress();
        this.email= user.getEmail();
        this.firstName= user.getFirstName();
        this.lastName= user.getLastName();
        this.isActive= user.getIsActive();
    }

}
