package com.telconet.backend.repos;

import com.telconet.backend.domain.Curso;
import com.telconet.backend.domain.Persona;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CursoRepository extends JpaRepository<Curso, Long> {

    List<Curso> findAllByAlumnos(Persona persona);
    
    List<Curso> findByProfesor(Persona profesor);

}
