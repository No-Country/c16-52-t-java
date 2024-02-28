package com.lookingprof.lookingProf.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lookingprof.lookingProf.jwt.JwtService;
import com.lookingprof.lookingProf.model.City;
import com.lookingprof.lookingProf.model.Enum.Role;
import com.lookingprof.lookingProf.model.Profession;
import com.lookingprof.lookingProf.model.Province;
import com.lookingprof.lookingProf.model.User;
import com.lookingprof.lookingProf.repository.ICityRepository;
import com.lookingprof.lookingProf.repository.IProfessionRepository;
import com.lookingprof.lookingProf.repository.IProvincesRepository;
import com.lookingprof.lookingProf.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    IProvincesRepository provincesRepository;

    @Autowired
    IProfessionRepository professionRepository;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    ICityRepository cityRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserData userData;

    @Override
    public void run(String... args) throws Exception {
        loadData();
    }

    private void loadData() throws JsonProcessingException {

        if (provincesRepository.count() == 0) {
            List<String> provinces = List.of("Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
                    "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
                    "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
                    "Tucumán"
            );
            List<Province> provinceList = provinces.stream().map(province -> {
                Province province1 = new Province();
                province1.setNameProvince(province);
                return province1;
            }).toList();

            provincesRepository.saveAll(provinceList);
        }

        if (professionRepository.count() == 0) {
            List<String> professions = List.of("Ama de llaves", "Albañil", "Carpintero", "Cerrajero", "Cocinera",
                    "Costurera", "Cuidadora de niños", "Cuidadora de personas mayores", "Decorador", "Electricista",
                    "Fontanero", "Fumigador", "Gasfitero", "Jardinero", "Lavaplatos", "Limpiador", "Mecánico",
                    "Mozo de limpieza", "Pintor", "Plomero", "Reparador de electrodomésticos", "Reparador de muebles",
                    "Reparador de tejados", "Reparador de ventanas", "Restaurador", "Sastre", "Tapicero",
                    "Técnico de aire acondicionado", "Técnico de calefacción", "Técnico informático", "Yesero", "Zapatero"
            );

            List<Profession> professionList = professions.stream().map(profession -> {
                Profession profession1 = new Profession();
                profession1.setNameProfession(profession);
                return profession1;
            }).toList();

            professionRepository.saveAll(professionList);
        }

        if (userRepository.count() == 0){
            List<Profession> professionList = professionRepository.findAll();

            Optional<Province> province = provincesRepository.findById(12);

            City city = new City();
            city.setNameCity("Mendoza");
            city.setProvince(province.get());
            cityRepository.save(city);

            /**
             * User 1
             */
            User user = new User();
            user.setFirstName("Miguel");
            user.setLastName("Rodríguez");
            user.setEmail("miguelrodriguez@gmail.com");
            user.setPassword(passwordEncoder.encode("user1"));
            user.setPhone("+5491112345678");
            user.setAddress("Calle Falsa 1234");
            user.setCountry("Argentina");
            user.setProvince(province.get());
            user.setCity(city);
            user.setImageUrl("https://res.cloudinary.com/dlq0ud8ly/image/upload/v1709010028/LookingProf/happy-1836445_640_saykwj.jpg");
            user.setRole(Role.USER);

            userRepository.save(user);

            /**
             * User 2
             */
            Optional<Province> province2 = provincesRepository.findById(1);

            City city2 = new City();
            city2.setNameCity("Río Cuarto");
            city2.setProvince(province2.get());
            cityRepository.save(city2);

            User user2 = new User();
            user2.setFirstName("Juan");
            user2.setLastName("López");
            user2.setEmail("juanlopez@gmail.com");
            user2.setPassword(passwordEncoder.encode("user2"));
            user2.setPhone("+5491252985471");
            user2.setAddress("Calle Nueva 2345");
            user2.setCountry("Argentina");
            user2.setProvince(province2.get());
            user2.setCity(city2);
            user2.setImageUrl("https://res.cloudinary.com/dlq0ud8ly/image/upload/v1709011331/LookingProf/adult-1851571_640_tvytca.jpg");
            user2.setRole(Role.USER);

            userRepository.save(user2);

            /**
             * User 3
             */
            List<Map<String, Object>> mapList = userData.jsonData();

            List<Province> provinces = provincesRepository.findAll();
            List<Profession> professions = professionRepository.findAll();
            List<City> cities = cityRepository.findAll();

            for (int i = 0; i < mapList.size(); i++){
                City city3 = new City();
                city3.setNameCity((String) mapList.get(i).get("city"));
                city3.setProvince(provinces.get(i));
                cityRepository.save(city3);

                User user3 = new User();
                user3.setFirstName((String) mapList.get(i).get("firstName"));
                user3.setLastName((String) mapList.get(i).get("lastName"));
                user3.setEmail((String) mapList.get(i).get("email"));
                user3.setPassword(passwordEncoder.encode((String) mapList.get(i).get("password")));
                user3.setPhone((String) mapList.get(i).get("phone"));
                user3.setAddress((String) mapList.get(i).get("address"));
                user3.setCountry((String) mapList.get(i).get("country"));
                user3.setProvince(provinces.get(i));
                user3.setCity(city3);
                user3.setImageUrl((String) mapList.get(i).get("imageUrl"));
                user3.setQualification((Integer) mapList.get(i).get("qualification"));
                user3.setRole(Role.PROFESSIONAL);
                user3.setProfession(professions.get(i));
                user3.setDescription((String) mapList.get(i).get("description"));

                userRepository.save(user3);
            }

        }

    }
}
