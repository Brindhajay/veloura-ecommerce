package com.veloura.controller;

import com.veloura.dto.LoginRequest;
import com.veloura.dto.RegisterRequest;
import com.veloura.dto.LoginResponse;
import com.veloura.entity.User;
import com.veloura.service.UserService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public User register(@Valid @RequestBody RegisterRequest request) {

        return userService.registerUser(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        String token = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        return new LoginResponse(token);
    }
}