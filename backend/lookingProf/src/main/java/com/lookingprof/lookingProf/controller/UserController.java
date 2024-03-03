package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.dto.UserRequestDTO;
import com.lookingprof.lookingProf.dto.UserResponseDTO;
import com.lookingprof.lookingProf.model.Enum.Role;
import com.lookingprof.lookingProf.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
// @CrossOrigin(value = )
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private static final String ABSOLUTE_PATH = "C://Users//54375//Documents//LookingProfImgs";

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        Optional<List<UserResponseDTO>> optionalUsers = userService.listAll();

        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            String response = userService.deleteUser(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id,
            @RequestParam("province") String province,
            @RequestParam("city") String city,
            @RequestParam("profession") String profession,
            @RequestParam("role") String role,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            UserRequestDTO userRequestDTO = new UserRequestDTO(province, city, profession, role, description, image);
            Optional<UserResponseDTO> updatedUser = userService.updateUser(id, userRequestDTO);
            if (updatedUser.isPresent())
                return ResponseEntity.ok(updatedUser);
            else
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado el usuario");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar usuario");
        }
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        if (imageName != null) {
            Path imagePath = Paths.get(ABSOLUTE_PATH, imageName).toAbsolutePath();
            byte[] imageBytes = Files.readAllBytes(imagePath);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } else {
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findUserById(@PathVariable int id) {
        Optional<UserResponseDTO> userResponseDTO = userService.findById(id);
        if (userResponseDTO.isPresent()) {
            return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
    }

    @GetMapping("/firstName")
    public ResponseEntity<?> findByFirstname(@RequestParam String firstName) {
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByFirstname(firstName);
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/email")
    public ResponseEntity<?> findByEmail(@RequestParam String email) {
        Optional<UserResponseDTO> optionalUsers = userService.findByEmail(email);
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/province")
    public ResponseEntity<?> findByProvince(@RequestParam String province) {
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByProvince(province);
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/city")
    public ResponseEntity<?> findByCity(@RequestParam String city) {
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByCity(city);
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/profession")
    public ResponseEntity<?> findByProfession(@RequestParam String profession) {
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByProfession(profession);
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/qualification/{qualification}")
    public ResponseEntity<?> findByQualification(@PathVariable int qualification) {
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByQualification(qualification);
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/allActive")
    public ResponseEntity<?> getAllUsersActives() {
        List<UserResponseDTO> listUsersActives = userService.listAllActives();
        try {
            return ResponseEntity.ok(listUsersActives);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
