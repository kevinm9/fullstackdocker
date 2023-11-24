package com.telconet.backend.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PersonaDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String nombres;

    @NotNull
    @Size(max = 255)
    private String correo;

    @NotNull
    @Size(max = 255)
    private String password;

    @NotNull
    @Size(max = 255)
    private String especialidad;

    @NotNull
    @Size(max = 255)
    private String tipodeusuario;

    @NotNull
    @Size(max = 255)
    private String nivelacademico;

    @NotNull
    @Size(max = 255)
    private String motivoderegistro;

    @NotNull
    @Size(max = 255)
    private String areaestudio;

}
