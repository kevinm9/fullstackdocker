package com.telconet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.telconet.backend.model.LoginDTO;
import com.telconet.backend.model.PersonaDTO;
import com.telconet.backend.service.PersonaService;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;


@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
public class HomeController {
	
	@Autowired
    private PersonaService personaService;
	
    @PostMapping("/api/login")
    @ApiResponse(responseCode = "201")
    public ResponseEntity<?> login(@RequestBody @Valid final LoginDTO loginDTO) {
    	return new ResponseEntity<>(personaService.login(loginDTO), HttpStatus.ACCEPTED);
    }
	
    @GetMapping("/test")
    @ResponseBody
    public String index() {
        return "Hello World from backend springboot!";
    }

}
