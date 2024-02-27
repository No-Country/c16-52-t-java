package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.Auth.AuthResponse;
import com.lookingprof.lookingProf.Auth.LoginRequest;
import com.lookingprof.lookingProf.Auth.RegisterRequest;
import com.lookingprof.lookingProf.dto.UserResponseDTO;
import com.lookingprof.lookingProf.exceptions.UserDeleteException;
import com.lookingprof.lookingProf.exceptions.UserUpdateException;
import com.lookingprof.lookingProf.jwt.JwtService;
import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Enum.Role;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.model.User;
import com.lookingprof.lookingProf.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Override
    @Transactional(readOnly = true)
    public Optional<List<UserResponseDTO>> listAll() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            return Optional.empty();
        }
        List<UserResponseDTO> listUserDTO = new ArrayList<>();
        users.forEach(user -> {
            UserResponseDTO userResponseDTO = new UserResponseDTO(user);
            listUserDTO.add(userResponseDTO);
        });
        return Optional.of(listUserDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<List<UserResponseDTO>> findByFirstname(String firstName) {
        List<User> users = userRepository.findByFirstName(firstName);
        if (users.isEmpty()) {
            return Optional.empty();
        }
        List<UserResponseDTO> listUserDTO = new ArrayList<>();
        users.forEach(user -> {
            UserResponseDTO userResponseDTO = new UserResponseDTO(user);
            listUserDTO.add(userResponseDTO);
        });
        return Optional.of(listUserDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserResponseDTO> findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(UserResponseDTO::new);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }
        User user = userOptional.get();

        return Optional.of(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<User> deleteUser(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return Optional.empty(); // No se encontró el usuario, devolvemos Optional.empty()
        }
        User userDelete = user.get();
        try {
            userRepository.delete(userDelete);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UserDeleteException("Error al eliminar el usuario con ID: " + id, e);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<UserResponseDTO> updateUser(Integer id, UserResponseDTO userUpdate) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()){
            return Optional.empty();
        }
        User user = userOptional.get();
        try {
            user.setFirstName(userUpdate.getFirstName());
            user.setLastName(userUpdate.getLastName());
            user.setPhone(userUpdate.getPhone());
            user.setPhone(userUpdate.getEmail());
            userRepository.save(user);
            return Optional.of(new UserResponseDTO(user));
        } catch (Exception e) {
            e.printStackTrace();
            throw new UserUpdateException("Error al actualizar el usuario");
        }
    }

    @Override
    public Optional<List<UserResponseDTO>> findByProfession(String profession) {
        List<User> users = userRepository.findByProfession_NameProfession(profession);
        if (users.isEmpty()) {
            return Optional.empty();
        }
        List<UserResponseDTO> listUserDTO = new ArrayList<>();
        users.forEach(user -> {
            UserResponseDTO userResponseDTO = new UserResponseDTO(user);
            listUserDTO.add(userResponseDTO);
        });
        return Optional.of(listUserDTO);
    }


    @Override
    public Optional<List<UserResponseDTO>> findByProvince(String province) {
        List<User> users = userRepository.findByProvince_NameProvince(province);
        if (users.isEmpty()) {
            return Optional.empty();
        } else {
            List<UserResponseDTO> listUserDTO = new ArrayList<>();
            users.forEach(user -> {
                UserResponseDTO userResponseDTO = new UserResponseDTO(user);
                listUserDTO.add(userResponseDTO);
            });
            return Optional.of(listUserDTO);
        }
    }

    @Override
    public Optional<List<UserResponseDTO>> findByCity(String city) {
            List<User> users = userRepository.findByCity_NameCity(city);
            if (users.isEmpty()) {
                return Optional.empty();
            } else {
                List<UserResponseDTO> listUserDTO = new ArrayList<>();
                users.forEach(user -> {
                    UserResponseDTO userResponseDTO = new UserResponseDTO(user);
                    listUserDTO.add(userResponseDTO);
                });
                return Optional.of(listUserDTO);
            }
        }

    @Override
    public Optional<List<UserResponseDTO>> findByQualification(int qualification) {
        List<User> users = userRepository.findByQualification(qualification);
        if (users.isEmpty()) {
            return Optional.empty();
        } else {
            List<UserResponseDTO> listUserDTO = new ArrayList<>();
            users.forEach(user -> {
                UserResponseDTO userResponseDTO = new UserResponseDTO(user);
                listUserDTO.add(userResponseDTO);
            });
            return Optional.of(listUserDTO);
        }
    }

    @Override
    public AuthResponse loginUser(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder().token(token).build();
    }

    @Override
    public AuthResponse registerUser(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(String.valueOf(request.getRole())));
        user.setCreateAt(LocalDateTime.now());
        userRepository.save(user);
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user does not exists"));

        return new org.springframework.security.core.userdetails.User(
                userDetails.getUsername(),
                "",
                userDetails.getAuthorities()
        );
    }

}
