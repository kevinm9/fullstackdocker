package com.telconet.backend.repos;

import com.telconet.backend.domain.Persona;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface PersonaRepository extends JpaRepository<Persona, Long> {
	
	Optional<Persona> findByCorreo(String correo);
	Optional<Persona> findByCorreoAndPassword(String correo,String password);
	
	//'estudiante' o profesor
	@Query("SELECT p FROM Persona p WHERE p.tipodeusuario = 'profesor'")
	List<Persona> findByusuariosprofesores(Sort sort);
	
}
