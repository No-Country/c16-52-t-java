package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.dto.UserResponseDTO;
import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.model.User;
import com.lookingprof.lookingProf.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
//@CrossOrigin(value = )
@RequiredArgsConstructor
public class UserController {

    @Value("${frontend}")
    private String frontendUrl;

    private final UserService userService;

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
        Optional<User> deletedUser = userService.deleteUser(id);
        if (deletedUser.isPresent()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody UserResponseDTO userUpdate) {
        Optional<UserResponseDTO> updatedUser = userService.updateUser(id, userUpdate);
        if (updatedUser.isPresent()) {
            return ResponseEntity.ok(updatedUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/firstName")
    public ResponseEntity<?> findByFirstname(@RequestParam String firstName){
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByFirstname(firstName);
        if (optionalUsers.isPresent()){
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/email")
    public ResponseEntity<?> findByEmail(@RequestParam String email){
        System.out.println(frontendUrl);
        Optional<UserResponseDTO> optionalUsers = userService.findByEmail(email);
        if (optionalUsers.isPresent()){
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/province")
    public ResponseEntity<?> findByProvince(@RequestParam String province){
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByProvince(province);
        if (optionalUsers.isPresent()){
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/city")
    public ResponseEntity<?> findByCity(@RequestParam String city){
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByCity(city);
        if (optionalUsers.isPresent()){
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/profession")
    public ResponseEntity<?> findByProfession(@RequestParam String profession){
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByProfession(profession);
        if (optionalUsers.isPresent()){
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

    @GetMapping("/qualification/{qualification}")
    public ResponseEntity<?> findByQualification(@PathVariable int qualification){
        Optional<List<UserResponseDTO>> optionalUsers = userService.findByQualification(qualification);
        if (optionalUsers.isPresent()){
            return ResponseEntity.ok(optionalUsers.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usuarios");
        }
    }

}
