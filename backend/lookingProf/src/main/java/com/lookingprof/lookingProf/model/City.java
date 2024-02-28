package com.lookingprof.lookingProf.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class City {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int idCity;

    //@Column(unique = true)
    private String nameCity;

    @ManyToOne
    @JoinColumn(name="fk_province")
    private Province province;

    @OneToMany(mappedBy = "city")
    List<User> users;

}
