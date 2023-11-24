package com.telconet.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Persona {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombres;

    @Email
    @Column(nullable = false, unique=true)
    private String correo;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String especialidad;

    @Column(nullable = false)
    private String tipodeusuario;

    @Column(nullable = false)
    private String nivelacademico;

    @Column(nullable = false)
    private String motivoderegistro;

    @Column(nullable = false)
    private String areaestudio;

    @ManyToMany(mappedBy = "alumnos")
    private Set<Curso> cursosdelalumno;

    @OneToMany(mappedBy = "profesor")
    @JsonIgnore
    private Set<Curso> cursoprofesor;

}
