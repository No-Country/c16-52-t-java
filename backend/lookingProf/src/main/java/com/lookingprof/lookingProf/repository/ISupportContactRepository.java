package com.lookingprof.lookingProf.repository;

import com.lookingprof.lookingProf.model.SupportContact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISupportContactRepository extends JpaRepository<SupportContact, Integer> {
}
