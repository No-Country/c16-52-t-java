package com.lookingprof.lookingProf.repository;

import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;


@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

    List<User> findByFirstName(String userName);

    Optional<User> findByEmail(String email);

    List<User> findByProfession_NameProfession(String profession);

    List<User> findByProvince_NameProvince(String province);

    List<User> findByCity_NameCity(String city);

    //@Query("SELECT u FROM User u WHERE u.qualification IS NOT NULL")
    List<User> findByQualification(int qualification);

    @Query("SELECT u FROM User u WHERE u.isActive = true")
    List<User> findAllNotDeleted();

}
