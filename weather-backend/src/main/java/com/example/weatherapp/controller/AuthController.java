package com.example.weatherapp.controller;

import com.example.weatherapp.entity.User;
import com.example.weatherapp.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        try {
            User user = authService.signUp(
                    body.get("name"),
                    body.get("email"),
                    body.get("password")
            );

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail()
            ));

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    // SIGNIN
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> body) {
        try {
            User user = authService.signIn(
                    body.get("email"),
                    body.get("password")
            );

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail()
            ));

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(401).body(Map.of("error", ex.getMessage()));
        }
    }
}
