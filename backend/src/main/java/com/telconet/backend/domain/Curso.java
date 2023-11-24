package com.telconet.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Curso {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer totaldocu;

    @Column(nullable = false)
    private Integer maxhorduracion;

    @Column(nullable = false)
    private Integer maxcantalumnos;

    @ManyToMany
    @JoinTable(
            name = "CursoAlumnos",
            joinColumns = @JoinColumn(name = "cursoId"),
            inverseJoinColumns = @JoinColumn(name = "personaId")
    )
    @JsonIgnore
    private Set<Persona> alumnos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profesor_id", nullable = false)
    @JsonIgnore
    private Persona profesor;

}
