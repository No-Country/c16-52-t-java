package com.lookingprof.lookingProf.model;

import com.lookingprof.lookingProf.model.Enum.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;
    @NotEmpty(message = "El apellido no puede estar vacío")
    private String lastName;
    @NotEmpty(message = "El nombre de usuario no puede estar vacío")
    private String userName;

    @Column(unique = true)
    @NotEmpty(message = "El email no puede estar vacío")
    private String email;
    @NotEmpty(message = "La contraseña no puede estar vacía")
    private String password;
    @Size(max=20 , message = "El número de teléfono debe tener 10 dígitos")
    private String phone;
    private String address;
    @NotEmpty(message = "El país no puede estar vacío")
    private String country;
    @OneToOne
    @JoinColumn(name = "idProvince", referencedColumnName = "idProvince")
    @NotEmpty(message = "Debe seleccionar una provincia")
    private Province province;
    @OneToOne
    @JoinColumn(name = "city")
    @NotEmpty(message = "Debe seleccionar una ciudad")
    private City city;
    private Integer qualification;
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "idProfession")
    private Profession profession;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
