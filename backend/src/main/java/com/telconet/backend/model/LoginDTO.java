package com.telconet.backend.model;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {

	@NotNull
    private String correo;
	@NotNull
	private String password;

}
