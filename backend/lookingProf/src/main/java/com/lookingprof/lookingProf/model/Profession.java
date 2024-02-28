package com.lookingprof.lookingProf.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProfession;

    private String nameProfession;

    @OneToMany(mappedBy = "profession")
    private List<User> listUsers;

}
