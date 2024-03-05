package com.lookingprof.lookingProf.repository;

import com.lookingprof.lookingProf.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICityRepository extends JpaRepository<City, Integer> {
    City findByNameCity(String city);


}
