package com.example.weatherapp.service;

import org.springframework.stereotype.Service;
import com.example.weatherapp.dto.WeatherDTO;
import java.util.*;

@Service
public class WeatherService {
  private final String externalApiKey = System.getenv("OPEN_WEATHER_API_KEY");

  public WeatherDTO getCurrentWeather(String city) {
    WeatherDTO w = new WeatherDTO();
    w.setLocation(city);
    w.setTemperature(26.3);
    w.setHumidity(60);
    w.setWindSpeed(3.5);
    w.setDescription("Partly cloudy");
    w.setLat(12.9716);
    w.setLon(77.5946);
    List<WeatherDTO.DayDTO> days = new ArrayList<>();
    for (int i = 1; i <= 7; i++) {
      WeatherDTO.DayDTO d = new WeatherDTO.DayDTO();
      d.setDate(java.time.LocalDate.now().plusDays(i).toString());
      d.setMin(20 + i);
      d.setMax(25 + i);
      d.setIcon("☀️");
      days.add(d);
    }
    w.setDays(days);
    return w;
  }

  public List<Map<String, String>> getAlerts(String city) {
    return Collections.emptyList();
  }
}
