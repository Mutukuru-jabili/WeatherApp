package com.example.weatherapp.repository;

import com.example.weatherapp.entity.FavoriteLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteLocationRepository extends JpaRepository<FavoriteLocation, Long> {
}
