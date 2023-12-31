package com.telconet.backend.rest;

import com.telconet.backend.model.PersonaDTO;
import com.telconet.backend.service.PersonaService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RequestMapping(value = "/api/personas", produces = MediaType.APPLICATION_JSON_VALUE)
public class PersonaResource {

    private final PersonaService personaService;

    public PersonaResource(final PersonaService personaService) {
        this.personaService = personaService;
    }

    @GetMapping
    public ResponseEntity<List<PersonaDTO>> getAllPersonas() {
        return ResponseEntity.ok(personaService.findAll());
    }
    
    @GetMapping("/profesores")
    public ResponseEntity<List<PersonaDTO>> getAllPersonasTipoProfesor() {
        return ResponseEntity.ok(personaService.findAllTipoProfesores());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonaDTO> getPersona(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(personaService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createPersona(@RequestBody @Valid final PersonaDTO personaDTO) {
    	final Long createdId = personaService.create(personaDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updatePersona(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final PersonaDTO personaDTO) {
        personaService.update(id, personaDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePersona(@PathVariable(name = "id") final Long id) {
        personaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
