package com.example.weatherapp.controller;

import com.example.weatherapp.entity.FavoriteLocation;
import com.example.weatherapp.repository.FavoriteLocationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteLocationController {

    private final FavoriteLocationRepository repository;

    public FavoriteLocationController(FavoriteLocationRepository repository) {
        this.repository = repository;
    }

    // CREATE
    @PostMapping
    public FavoriteLocation addFavorite(@RequestBody FavoriteLocation location) {
        return repository.save(location);
    }

    // READ ALL
    @GetMapping
    public List<FavoriteLocation> getAllFavorites() {
        return repository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<FavoriteLocation> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<FavoriteLocation> update(
            @PathVariable Long id,
            @RequestBody FavoriteLocation updated) {

        return repository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setCity(updated.getCity());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
