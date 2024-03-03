package com.lookingprof.lookingProf.repository;

import com.lookingprof.lookingProf.model.Profession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProfessionRepository extends JpaRepository<Profession, Integer> {
    Profession findByNameProfession(String profession);

}
