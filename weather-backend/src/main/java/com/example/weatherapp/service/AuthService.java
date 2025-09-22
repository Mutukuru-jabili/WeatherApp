package com.example.weatherapp.service;

import com.example.weatherapp.entity.User;
import com.example.weatherapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User signUp(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }
        // use 3-arg constructor (defaults to ROLE_USER)
        User user = new User(name, email, encoder.encode(password));
        return userRepository.save(user);
    }

    public User signIn(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> encoder.matches(password, user.getPasswordHash()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }
}
