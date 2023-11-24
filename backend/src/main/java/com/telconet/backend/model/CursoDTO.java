package com.telconet.backend.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CursoDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String nombre;

    @NotNull
    private Integer totaldocu;

    @NotNull
    private Integer maxhorduracion;

    @NotNull
    private Integer maxcantalumnos;

    private List<Long> alumnos;

    @NotNull
    private Long profesor;

}
