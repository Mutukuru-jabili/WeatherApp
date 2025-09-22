package com.example.weatherapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeatherDTO {
    private String location;
    private double temperature;
    private int humidity;
    private double windSpeed;
    private String description;
    private double lat;
    private double lon;
    private List<DayDTO> days;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DayDTO {
        private String date;
        private double min;
        private double max;
        private String icon;
    }
}
