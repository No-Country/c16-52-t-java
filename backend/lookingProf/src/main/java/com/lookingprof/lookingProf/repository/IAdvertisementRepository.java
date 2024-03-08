package com.lookingprof.lookingProf.repository;

import com.lookingprof.lookingProf.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdvertisementRepository extends JpaRepository<Advertisement, Integer> {
}
