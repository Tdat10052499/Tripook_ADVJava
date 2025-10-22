package com.tripook.tripook_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "timestamp", LocalDateTime.now(),
            "service", "Tripook Backend API",
            "version", "1.0.0"
        ));
    }

    @GetMapping("/public/info")
    public ResponseEntity<Map<String, Object>> publicInfo() {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome to Tripook API",
            "version", "1.0.0",
            "documentation", "/swagger-ui/index.html"
        ));
    }
}