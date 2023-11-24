package com.telconet.backend.service;

import com.telconet.backend.domain.Curso;
import com.telconet.backend.domain.Persona;
import com.telconet.backend.model.LoginDTO;
import com.telconet.backend.model.PersonaDTO;
import com.telconet.backend.repos.CursoRepository;
import com.telconet.backend.repos.PersonaRepository;
import com.telconet.backend.util.NotFoundException;
import jakarta.transaction.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

@Service
@Transactional
public class PersonaService {

	private final PersonaRepository personaRepository;
	private final CursoRepository cursoRepository;

	public PersonaService(final PersonaRepository personaRepository, final CursoRepository cursoRepository) {
		this.personaRepository = personaRepository;
		this.cursoRepository = cursoRepository;
	}

	public List<PersonaDTO> findAll() {
		final List<Persona> personae = personaRepository.findAll(Sort.by("id"));
		return personae.stream().map(persona -> mapToDTO(persona, new PersonaDTO())).toList();
	}
	
	public List<PersonaDTO> findAllTipoProfesores() {
		final List<Persona> personae = personaRepository.findByusuariosprofesores(Sort.by("id"));
		return personae.stream().map(persona -> mapToDTO(persona, new PersonaDTO())).toList();
	}

	public Map<String, Object> login(LoginDTO loginDTO) {

		Map<String, Object> body = new LinkedHashMap<>();

		PersonaDTO personaDTO = personaRepository.findByCorreoAndPassword(loginDTO.getCorreo(), loginDTO.getPassword())
				.map(persona -> mapToDTO(persona, new PersonaDTO())).orElseThrow(NotFoundException::new);
		
		Optional<Persona> p = personaRepository.findByCorreo(loginDTO.getCorreo());
		
		if (!p.get().getCursoprofesor().isEmpty()) {
			Set<Curso> cursos = p.get().getCursoprofesor();
			body.put("cursos", cursos);
		}
		
		
		
		body.put("profesor", personaDTO);
		
		return body;

	}

	public PersonaDTO get(final Long id) {
		return personaRepository.findById(id).map(persona -> mapToDTO(persona, new PersonaDTO()))
				.orElseThrow(NotFoundException::new);
	}

	public Long create(final PersonaDTO personaDTO) {

		if (personaRepository.findByCorreo(personaDTO.getCorreo()).isPresent()) {
			throw new RuntimeException("correo ya registrado en la base de datos");
		}

		final Persona persona = new Persona();
		mapToEntity(personaDTO, persona);
		return personaRepository.save(persona).getId();
	}

	public void update(final Long id, final PersonaDTO personaDTO) {
		final Persona persona = personaRepository.findById(id).orElseThrow(NotFoundException::new);
		mapToEntity(personaDTO, persona);
		personaRepository.save(persona);
	}

	public void delete(final Long id) {
		final Persona persona = personaRepository.findById(id).orElseThrow(NotFoundException::new);
		// remove many-to-many relations at owning side
		cursoRepository.findAllByAlumnos(persona).forEach(curso -> curso.getAlumnos().remove(persona));
		personaRepository.delete(persona);
	}

	private PersonaDTO mapToDTO(final Persona persona, final PersonaDTO personaDTO) {
		personaDTO.setId(persona.getId());
		personaDTO.setNombres(persona.getNombres());
		personaDTO.setCorreo(persona.getCorreo());
		personaDTO.setPassword(persona.getPassword());
		personaDTO.setEspecialidad(persona.getEspecialidad());
		personaDTO.setTipodeusuario(persona.getTipodeusuario());
		personaDTO.setNivelacademico(persona.getNivelacademico());
		personaDTO.setMotivoderegistro(persona.getMotivoderegistro());
		personaDTO.setAreaestudio(persona.getAreaestudio());
		return personaDTO;
	}

	private Persona mapToEntity(final PersonaDTO personaDTO, final Persona persona) {
		persona.setNombres(personaDTO.getNombres());
		persona.setCorreo(personaDTO.getCorreo());
		persona.setPassword(personaDTO.getPassword());
		persona.setEspecialidad(personaDTO.getEspecialidad());
		persona.setTipodeusuario(personaDTO.getTipodeusuario());
		persona.setNivelacademico(personaDTO.getNivelacademico());
		persona.setMotivoderegistro(personaDTO.getMotivoderegistro());
		persona.setAreaestudio(personaDTO.getAreaestudio());
		return persona;
	}

}
