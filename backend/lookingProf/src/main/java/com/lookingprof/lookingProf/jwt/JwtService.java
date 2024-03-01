package com.lookingprof.lookingProf.jwt;

import com.lookingprof.lookingProf.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final static String SECRET_KEY = "gsaQUPJ6ppr7MNZgzHYnGQ==MNbmLOqV65YF9mqR0VPUaQ==";

    /**
     * @param user son los datos del usuario a quien se le creará el token
     * @return devuelve un string con el token generado
     */
    public String getToken(User user){
        final int dayToMilliseconds = 1000 * 60 * 60 * 24;

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getAuthorities());
        extraClaims.put("imageProfile", user.getImageUrl());
        extraClaims.put("id", user.getIdUser());
        extraClaims.put("lastName", user.getLastName());
        extraClaims.put("firstName", user.getFirstName());

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + dayToMilliseconds))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Decodifica el SECRET_KEY a un array de bytes y lo usa para generar una clave secreta HMAC-SHA para firmar y verificar el token
     */
    private Key getKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Obtiene el userName del token que viene en la cabecera de la solicitud del frontend, usando el método getClaim
     */
    public String getUserNameFromToken(String token){
        return getClaim(token, Claims::getSubject);
    }

    /**
     * Obtiene un reclamo específico de todos los reclamos del token obtenidos con el metodo getAllClaims
     */
    public <T> T getClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Obtiene todos los reclamos del token
     */
    private Claims getAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Verifica si el token es válido, revisando su expiración y si el usuario de la solicitud coincide con el de la BD
     */
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String userName = getUserNameFromToken(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Verifica si el token expiró comparando la fecha actual con la fecha de expiración del token
     * */
    private boolean isTokenExpired(String token) {
        return getExpirationToken(token).before(new Date());
    }

    /**
     * Obtiene la fecha de expiración del token
     */
    private Date getExpirationToken(String token){
        return getClaim(token, Claims::getExpiration);
    }


}
