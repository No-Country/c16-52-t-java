package com.lookingprof.lookingProf.repository;

import com.lookingprof.lookingProf.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProvincesRepository extends JpaRepository<Province, Integer> {
    Province findByNameProvince(String province);
}
