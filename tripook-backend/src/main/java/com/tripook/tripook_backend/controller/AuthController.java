package com.tripook.tripook_backend.controller;

import com.tripook.tripook_backend.entity.User;
import com.tripook.tripook_backend.repository.UserRepository;
import com.tripook.tripook_backend.dto.AuthRequest;
import com.tripook.tripook_backend.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            // Kiểm tra email đã tồn tại
            Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            // Tạo user mới
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName());
            user.setPhone(request.getPhone());
            user.setRole(request.getRole() != null ? request.getRole() : User.Role.USER);
            user.setStatus(User.Status.ACTIVE);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());

            User savedUser = userRepository.save(user);
            
            // Tạo response (không trả về password)
            AuthResponse response = new AuthResponse();
            response.setUser(savedUser);
            response.setMessage("Registration successful");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // Tìm user theo email
            Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
            if (!userOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Invalid email or password");
            }

            User user = userOpt.get();
            
            // Kiểm tra password
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid email or password");
            }

            // Kiểm tra status
            if (user.getStatus() != User.Status.ACTIVE) {
                return ResponseEntity.badRequest().body("Account is not active");
            }

            // Tạo response
            AuthResponse response = new AuthResponse();
            response.setUser(user);
            response.setMessage("Login successful");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email) {
        try {
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (!userOpt.isPresent()) {
                return ResponseEntity.badRequest().body("User not found");
            }

            return ResponseEntity.ok(userOpt.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}