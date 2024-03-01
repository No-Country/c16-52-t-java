package com.lookingprof.lookingProf.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class UserData {

    public List<Map<String, Object>> jsonData() throws JsonProcessingException {
        String json =  "[" +
                "{\"firstName\": \"Marcela\", \"lastName\": \"Fernández\", \"email\": \"marcelafernandez@gmail.com\", \"password\": \"hashed_password_1\"," +
                " \"phone\": \"+5491252985471\", \"address\": \"Calle Principal 2678\", \"country\": \"Argentina\", \"imageUrl\": \"https://res.cloudinary.com/dlq0ud8ly/image/upload/v1709011331/LookingProf/adult-1851571_640_tvytca.jpg\"," +
                "\"qualification\": 4, \"description\": \"Soy especialista en tal profesión y tengo tanto tiempo de experiencia\", \"city\": \"La Plata\"}," +
                "{ \"firstName\": \"Alejandro\", \"lastName\": \"García\", \"email\": \"alejandrogarcia@gmail.com\", \"password\": \"hashed_password_2\"," +
                "\"phone\": \"+5491887654321\", \"address\": \"Avenida Principal 123\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/men/1.jpg\"," +
                "\"qualification\": 3, \"description\": \"Tengo experiencia en diferentes campos y estoy aquí para ayudarte.\", \"city\": \"San Fernando del Valle de Catamarca\"}," +
                "{ \"firstName\": \"María\", \"lastName\": \"Martínez\", \"email\": \"mariamartinez@gmail.com\", \"password\": \"hashed_password_3\", \"phone\": \"+5491122334455\"," +
                "\"address\": \"Calle Florida 567\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/women/2.jpg\", \"qualification\": 5," +
                "\"description\": \"Soy apasionada por mi trabajo y me encanta ayudar a otros.\", \"city\": \"Resistencia\"}," +
                "{\"firstName\": \"Pedro\", \"lastName\": \"Rodríguez\", \"email\": \"pedrorodriguez@gmail.com\", \"password\": \"hashed_password_4\", " +
                "\"phone\": \"+5491556677889\", \"address\": \"Avenida Libertador 987\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/men/3.jpg\"," +
                " \"qualification\": 4, \"description\": \"Especializado en resolver problemas de forma eficiente.\", \"city\": \"Rawson\"}," +
                "{\"firstName\":\"Sofía\",\"lastName\":\"García\",\"email\":\"sofiagarcia@gmail.com\",\"password\":\"hashed_password_6\"," +
                "\"phone\":\"+5491556677999\",\"address\":\"Avenida San Martín 123\",\"country\":\"Argentina\",\"imageUrl\":\"https://randomuser.me/api/portraits/women/5.jpg\"," +
                "\"qualification\":5,\"description\":\"Experiencia en resolver problemas complejos de manera efectiva.\",\"city\":\"Córdoba\"}," +
        "{\"firstName\": \"Carlos\", \"lastName\": \"González\", \"email\": \"carlosgonzalez@gmail.com\", \"password\": \"hashed_password_6\"," +
                "\"phone\": \"+5491777665544\", \"address\": \"Avenida San Martín 789\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/men/5.jpg\"," +
                " \"qualification\": 3, \"description\": \"Siempre buscando nuevas formas de ayudar a mis clientes.\", \"city\": \"Corrientes\"}," +
                "{\"firstName\": \"Ana\", \"lastName\": \"Díaz\", \"email\": \"anadiaz@gmail.com\", \"password\": \"hashed_password_7\", " +
                "\"phone\": \"+5491223344556\", \"address\": \"Calle Corrientes 456\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/women/6.jpg\"," +
                " \"qualification\": 5, \"description\": \"Experta en resolver problemas complejos de manera eficiente.\", \"city\": \"Paraná\"}," +
                "{\"firstName\": \"Jorge\", \"lastName\": \"Hernández\", \"email\": \"jorgehernandez@gmail.com\", \"password\": \"hashed_password_8\"," +
                " \"phone\": \"+5491888776655\", \"address\": \"Avenida Belgrano 654\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/men/7.jpg\"," +
                " \"qualification\": 4, \"description\": \"Comprometido en brindar la mejor calidad de servicio.\", \"city\": \"Formosa\"}," +
                "{\"firstName\": \"Laura\", \"lastName\": \"López\", \"email\": \"lauralopez@gmail.com\", \"password\": \"hashed_password_9\"," +
                " \"phone\": \"+5491443322110\", \"address\": \"Calle Maipú 890\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/women/8.jpg\"," +
                " \"qualification\": 4, \"description\": \"Enfocada en ofrecer soluciones personalizadas y efectivas.\", \"city\": \"San Salvador de Jujuy\"}," +
                "{\"firstName\": \"Martín\", \"lastName\": \"Martínez\", \"email\": \"martinmartinez@gmail.com\", \"password\": \"hashed_password_10\"," +
                " \"phone\": \"+5491554433221\", \"address\": \"Avenida Rivadavia 1234\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/men/9.jpg\"," +
                " \"qualification\": 3, \"description\": \"Con experiencia en resolver una amplia gama de problemas.\", \"city\": \"Santa Rosa\"}," +
                "{\"firstName\": \"Carolina\", \"lastName\": \"Pérez\", \"email\": \"carolinaperez@gmail.com\", \"password\": \"hashed_password_11\"," +
                " \"phone\": \"+5491222334455\", \"address\": \"Calle Reconquista 432\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/women/10.jpg\"," +
                " \"qualification\": 5, \"description\": \"Especialista en encontrar soluciones innovadoras.\", \"city\": \"La Rioja\"}," +
                "{\"firstName\": \"Diego\", \"lastName\": \"Suárez\", \"email\": \"diegosuarez@gmail.com\", \"password\": \"hashed_password_12\"," +
                " \"phone\": \"+5491776655443\", \"address\": \"Avenida del Sol 876\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/men/11.jpg\"," +
                " \"qualification\": 4, \"description\": \"Con habilidades para resolver problemas de manera rápida y precisa.\", \"city\": \"San Rafael\"}," +
                "{\"firstName\": \"Valentina\", \"lastName\": \"Gómez\", \"email\": \"valentinagomez@gmail.com\", \"password\": \"hashed_password_13\"," +
                " \"phone\": \"+5491888877766\", \"address\": \"Calle Sarmiento 345\", \"country\": \"Argentina\", \"imageUrl\": \"https://randomuser.me/api/portraits/women/11.jpg\"," +
                " \"qualification\": 4, \"description\": \"Con habilidades para resolver problemas de manera rápida y precisa.\", \"city\": \"Posadas\"}" +
                "]"
        ;

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, List.class);
    }
}