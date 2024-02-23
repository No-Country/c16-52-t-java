package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.Auth.AuthResponse;
import com.lookingprof.lookingProf.Auth.LoginRequest;
import com.lookingprof.lookingProf.Auth.RegisterRequest;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface IUserService extends UserDetailsService {

    public List<User> findByName(String firsName);
    public Optional<User> deleteUser(Integer id);
    public Optional<User> findByEmail(String email);
    public List<User> listAllByProfession(Profession profession);
    public List<User> listByProvince(String province);
    public List<User> listByCountry(String country);
    public List<User> listByCity(String city);
    public List<User> listByQualification();
    public List<User> listAll();
    public Optional<User> findById(Integer id);
    public AuthResponse loginUser(LoginRequest user);
    public AuthResponse registerUser(RegisterRequest user);
    public UserDetails loadUserByUsername(String username);

}
