package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.config.Auth.AuthResponse;
import com.lookingprof.lookingProf.config.Auth.LoginRequest;
import com.lookingprof.lookingProf.config.Auth.RegisterRequest;
import com.lookingprof.lookingProf.dto.UserRequestDTO;
import com.lookingprof.lookingProf.dto.UserResponseDTO;
import com.lookingprof.lookingProf.exceptions.UserDeleteException;
import com.lookingprof.lookingProf.exceptions.UserUpdateException;
import com.lookingprof.lookingProf.jwt.JwtService;
import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Enum.Role;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.model.User;
import com.lookingprof.lookingProf.repository.ICityRepository;
import com.lookingprof.lookingProf.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    CityService cityService;

    @Autowired
    ICityRepository cityRepository;

    @Autowired
    ProvinceService provinceService;
    @Autowired
    ProfessionService professionService;
    @Autowired
    ImageService imageService;

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
    public Optional<UserResponseDTO> findById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }
        User user = userOptional.get();
        return Optional.of(new UserResponseDTO(user));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String deleteUser(Integer id) {
        Optional<User> user = userRepository.findById(id);

        User userDelete = user.get();
        try {
            userDelete.setIsActive(false);
            userRepository.save(userDelete);
            return "Usuario eliminado correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            throw new UserDeleteException("Error al eliminar el usuario con ID: " + id, e);
        }
    }

//    @Override
//    @Transactional(rollbackFor = Exception.class)
//    public Optional<UserResponseDTO> updateUser(Integer id, UserRequestDTO userUpdate) {
//        Optional<User> userOptional = userRepository.findById(id);
//        Province province = provinceService.getProvinceById((userUpdate.getProvince()));
//
//        if (userOptional.isEmpty()){
//            return Optional.empty();
//        }
//        User user = userOptional.get();
//        try {
//            user.setProvince(provinceService.getProvinceById(Integer.parseInt(userUpdate.getProvince())));
//            user.setCity(cityService.getCityById(Integer.parseInt(userUpdate.getCity())));
//            user.setProfession(professionService.getById(Integer.parseInt(userUpdate.getProfession())));
//            user.setDescription(userUpdate.getDescription());
//            if(userUpdate.getImage() != null) user.setImageUrl(imageService.copyProfileImg(user.getImageUrl(), userUpdate.getImage()));
//            userRepository.save(user);
//            return Optional.of(new UserResponseDTO(user));
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new UserUpdateException("Error al actualizar el usuario");
//        }
//
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<UserResponseDTO> updateUser(Integer id, UserRequestDTO userUpdate) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()){
            return Optional.empty();
        }
        User user = userOptional.get();
        try {
            if (userUpdate.getProvince() != null) {
                Province province = provinceService.getProvinceById(userUpdate.getProvince());
                user.setProvince(province);
            }
            if (userUpdate.getCity() != null) {
                City city = cityService.getCityByName(userUpdate.getCity());
                if (city != null){
                    user.setCity(city);
                } else {
                    Province province = provinceService.getProvinceById(userUpdate.getProvince());
                    City city1 = new City();
                    city1.setNameCity(userUpdate.getCity());
                    city1.setProvince(province);
                    cityRepository.save(city1);
                    user.setCity(city1);
                }
            }
            if (userUpdate.getProfession() != null) {
                user.setProfession(professionService.getById(userUpdate.getProfession()));
            }
            if (userUpdate.getDescription() != null){
                user.setDescription(userUpdate.getDescription());
            }
            if (userUpdate.getPhone() != null){
                user.setPhone(userUpdate.getPhone());
            }
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
        Province province = provinceService.getProvinceById(request.getProvinceId());
        City city = cityService.getCityById(request.getCityId());
        System.out.println(request.getRole() + " " + request.getRole().getClass());
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(String.valueOf(request.getRole())));
        user.setProvince(province);
        user.setCity(city);
        user.setIsActive(true);
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

    @Override
    public List<UserResponseDTO> listAllActives() {
        List<User> userList = userRepository.findAllNotDeleted();
        if(!userList.isEmpty()){
            List<UserResponseDTO> listUsersDto = new ArrayList<>();
            userList.forEach(user -> {
                UserResponseDTO userResponseDTO = new UserResponseDTO(user);
                listUsersDto.add(userResponseDTO);
            });
            return listUsersDto;
        }else{
            throw new RuntimeException("No hay usuarios activos registrados");
        }
    }
}
