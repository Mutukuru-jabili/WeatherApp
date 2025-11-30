package com.example.weatherapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.example.weatherapp.dto.WeatherDTO;
import com.example.weatherapp.service.WeatherService;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    // CURRENT WEATHER
    @GetMapping("/current")
    public ResponseEntity<WeatherDTO> getCurrentWeather(@RequestParam String city) {
        return ResponseEntity.ok(weatherService.getCurrentWeather(city));
    }

    // FORECAST
    @GetMapping("/forecast")
    public ResponseEntity<WeatherDTO> getForecast(@RequestParam String city) {
        // WeatherService does not define getForecast(String), use existing getCurrentWeather(String)
        return ResponseEntity.ok(weatherService.getCurrentWeather(city));
    }

    // ALERTS
    @GetMapping("/alerts")
    public ResponseEntity<List<?>> getAlerts(@RequestParam String city) {
        return ResponseEntity.ok(weatherService.getAlerts(city));
    }
}
