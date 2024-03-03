package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.config.Auth.AuthResponse;
import com.lookingprof.lookingProf.config.Auth.LoginRequest;
import com.lookingprof.lookingProf.config.Auth.RegisterRequest;
import com.lookingprof.lookingProf.dto.UserRequestDTO;
import com.lookingprof.lookingProf.dto.UserResponseDTO;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IUserService extends UserDetailsService {

    public Optional<List<UserResponseDTO>> listAll();
    public Optional<UserResponseDTO> findById(Integer id);
    public String deleteUser(Integer id);
    public Optional<UserResponseDTO> updateUser(Integer id, UserRequestDTO userDTO);
    public Optional<List<UserResponseDTO>> findByFirstname(String firstName);
    public Optional<UserResponseDTO> findByEmail(String email);

    public Optional<List<UserResponseDTO>> findByProfession(String profession);
    public Optional<List<UserResponseDTO>> findByProvince(String province);
    public Optional<List<UserResponseDTO>> findByCity(String city);
    public Optional<List<UserResponseDTO>> findByQualification(int qualification);

    public AuthResponse loginUser(LoginRequest user);
    public AuthResponse registerUser(RegisterRequest user);
    public UserDetails loadUserByUsername(String username);
    public List<UserResponseDTO> listAllActives();


}
