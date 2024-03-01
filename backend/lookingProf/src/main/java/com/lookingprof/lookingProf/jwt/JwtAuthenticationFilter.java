package com.lookingprof.lookingProf.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        /** Obtiene el parámetro que contiene al token desde la cabecera de la solicitud */
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String token;
        final String username;

        /** Si authHeader es null o el endpoint que se solicita no incluye 'auth' en el nombre, se omite el filtro de JWT */
        if(authHeader == null || request.getServletPath().contains("/auth")){
            filterChain.doFilter(request, response);
            return;
        }

        /** Se extrae el token desde authHeader separando 'Bearer ' y se obtiene el username del token */
        token = authHeader.substring(7);
        username = jwtService.getUserNameFromToken(token);

        /** Verifica si el nombre de usuario no es nulo y si no hay autenticación en el contexto actual */
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Carga los detalles del usuario utilizando el servicio de detalles del usuario
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            /** Verifica si el token JWT es válido para el usuario actual y crea un objeto de
             autenticación de nombre de usuario y contraseña utilizando los detalles del usuario */
            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                /** Establece los detalles de la autenticación a partir de la solicitud actual */
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                /** Establece la autenticación en el contexto de seguridad */
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token invalid");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }



}

