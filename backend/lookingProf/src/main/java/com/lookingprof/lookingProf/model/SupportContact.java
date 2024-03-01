package com.lookingprof.lookingProf.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupportContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSuportContact;

    private String userName;
    private String lastName;
    private String email;
    private String asunt;
    private String description;
}
