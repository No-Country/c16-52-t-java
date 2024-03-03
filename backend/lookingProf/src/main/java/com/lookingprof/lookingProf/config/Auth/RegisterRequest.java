package com.lookingprof.lookingProf.config.Auth;


import com.lookingprof.lookingProf.model.Enum.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    String email;
    String firstName;
    String lastName;
    String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private int cityId;
    private int provinceId;

}
