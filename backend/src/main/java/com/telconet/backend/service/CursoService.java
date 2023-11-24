package com.telconet.backend.service;

import com.telconet.backend.domain.Curso;
import com.telconet.backend.domain.Persona;
import com.telconet.backend.model.CursoDTO;
import com.telconet.backend.repos.CursoRepository;
import com.telconet.backend.repos.PersonaRepository;
import com.telconet.backend.util.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class CursoService {

    private final CursoRepository cursoRepository;
    private final PersonaRepository personaRepository;

    public CursoService(final CursoRepository cursoRepository,
            final PersonaRepository personaRepository) {
        this.cursoRepository = cursoRepository;
        this.personaRepository = personaRepository;
    }

    public List<CursoDTO> findAll() {
        final List<Curso> cursoes = cursoRepository.findAll(Sort.by("id"));
        return cursoes.stream()
                .map(curso -> mapToDTO(curso, new CursoDTO()))
                .toList();
    }
    
    public List<CursoDTO> getporprofesor(final Long id) {
    	Persona p = personaRepository.findById(id).orElseThrow(NotFoundException::new);
        final List<Curso> cursoes = cursoRepository.findByProfesor(p);
        return cursoes.stream()
                .map(curso -> mapToDTO(curso, new CursoDTO()))
                .toList();
    }

    public CursoDTO get(final Long id) {
        return cursoRepository.findById(id)
                .map(curso -> mapToDTO(curso, new CursoDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final CursoDTO cursoDTO) {
        final Curso curso = new Curso();
        mapToEntity(cursoDTO, curso);
        return cursoRepository.save(curso).getId();
    }

    public void update(final Long id, final CursoDTO cursoDTO) {
        final Curso curso = cursoRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(cursoDTO, curso);
        cursoRepository.save(curso);
    }
    
    public void matricularse(final Long id, final Long idalumno) {
        final Curso curso = cursoRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Persona alumno = personaRepository.findById(idalumno)
                .orElseThrow(NotFoundException::new);
        curso.getAlumnos().add(alumno);
        cursoRepository.save(curso);
    }

    public void delete(final Long id) {
        cursoRepository.deleteById(id);
    }

    private CursoDTO mapToDTO(final Curso curso, final CursoDTO cursoDTO) {
        cursoDTO.setId(curso.getId());
        cursoDTO.setNombre(curso.getNombre());
        cursoDTO.setTotaldocu(curso.getTotaldocu());
        cursoDTO.setMaxhorduracion(curso.getMaxhorduracion());
        cursoDTO.setMaxcantalumnos(curso.getMaxcantalumnos());
        cursoDTO.setAlumnos(curso.getAlumnos().stream()
                .map(persona -> persona.getId())
                .toList());
        cursoDTO.setProfesor(curso.getProfesor() == null ? null : curso.getProfesor().getId());
        return cursoDTO;
    }

    private Curso mapToEntity(final CursoDTO cursoDTO, final Curso curso) {
        curso.setNombre(cursoDTO.getNombre());
        curso.setTotaldocu(cursoDTO.getTotaldocu());
        curso.setMaxhorduracion(cursoDTO.getMaxhorduracion());
        curso.setMaxcantalumnos(cursoDTO.getMaxcantalumnos());
        final List<Persona> alumnos = personaRepository.findAllById(
                cursoDTO.getAlumnos() == null ? Collections.emptyList() : cursoDTO.getAlumnos());
        if (alumnos.size() != (cursoDTO.getAlumnos() == null ? 0 : cursoDTO.getAlumnos().size())) {
            throw new NotFoundException("one of alumnos not found");
        }
        curso.setAlumnos(alumnos.stream().collect(Collectors.toSet()));
        final Persona profesor = cursoDTO.getProfesor() == null ? null : personaRepository.findById(cursoDTO.getProfesor())
                .orElseThrow(() -> new NotFoundException("profesor not found"));
        curso.setProfesor(profesor);
        return curso;
    }

}
