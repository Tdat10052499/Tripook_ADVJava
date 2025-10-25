package com.tripook.tripook_backend.controller;

import com.tripook.tripook_backend.entity.Favorite;
import com.tripook.tripook_backend.entity.User;
import com.tripook.tripook_backend.entity.Listing;
import com.tripook.tripook_backend.repository.FavoriteRepository;
import com.tripook.tripook_backend.repository.UserRepository;
import com.tripook.tripook_backend.repository.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getFavoritesByUser(@PathVariable Long userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (!user.isPresent()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            List<Favorite> favorites = favoriteRepository.findByUser(user.get());
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addToFavorites(@RequestBody Map<String, Long> request) {
        try {
            Long userId = request.get("userId");
            Long listingId = request.get("listingId");
            
            // Validate user exists
            Optional<User> user = userRepository.findById(userId);
            if (!user.isPresent()) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Validate listing exists
            Optional<Listing> listing = listingRepository.findById(listingId);
            if (!listing.isPresent()) {
                return ResponseEntity.badRequest().body("Listing not found");
            }

            // Check if already favorited
            Optional<Favorite> existingFavorite = favoriteRepository
                .findByUserAndListing(user.get(), listing.get());
            
            if (existingFavorite.isPresent()) {
                return ResponseEntity.badRequest().body("Listing already in favorites");
            }

            Favorite favorite = new Favorite();
            favorite.setUser(user.get());
            favorite.setListing(listing.get());
            favorite.setCreatedAt(LocalDateTime.now());
            
            Favorite savedFavorite = favoriteRepository.save(favorite);
            return ResponseEntity.ok(savedFavorite);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding to favorites: " + e.getMessage());
        }
    }

    @DeleteMapping("/user/{userId}/listing/{listingId}")
    public ResponseEntity<?> removeFromFavorites(@PathVariable Long userId, @PathVariable Long listingId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            Optional<Listing> listing = listingRepository.findById(listingId);
            
            if (!user.isPresent() || !listing.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Optional<Favorite> favorite = favoriteRepository.findByUserAndListing(user.get(), listing.get());
            
            if (!favorite.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            favoriteRepository.delete(favorite.get());
            return ResponseEntity.ok().body("Removed from favorites");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error removing from favorites: " + e.getMessage());
        }
    }

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleFavorite(@RequestBody Map<String, Long> request) {
        try {
            Long userId = request.get("userId");
            Long listingId = request.get("listingId");
            
            // Validate user exists
            Optional<User> user = userRepository.findById(userId);
            if (!user.isPresent()) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Validate listing exists
            Optional<Listing> listing = listingRepository.findById(listingId);
            if (!listing.isPresent()) {
                return ResponseEntity.badRequest().body("Listing not found");
            }

            Optional<Favorite> existingFavorite = favoriteRepository
                .findByUserAndListing(user.get(), listing.get());
            
            if (existingFavorite.isPresent()) {
                // Remove from favorites
                favoriteRepository.delete(existingFavorite.get());
                return ResponseEntity.ok().body("Removed from favorites");
            } else {
                // Add to favorites
                Favorite favorite = new Favorite();
                favorite.setUser(user.get());
                favorite.setListing(listing.get());
                favorite.setCreatedAt(LocalDateTime.now());
                
                Favorite savedFavorite = favoriteRepository.save(favorite);
                return ResponseEntity.ok(savedFavorite);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error toggling favorite: " + e.getMessage());
        }
    }

    @GetMapping("/check/{userId}/{listingId}")
    public ResponseEntity<?> checkIfFavorited(@PathVariable Long userId, @PathVariable Long listingId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            Optional<Listing> listing = listingRepository.findById(listingId);
            
            if (!user.isPresent() || !listing.isPresent()) {
                return ResponseEntity.badRequest().body("User or listing not found");
            }
            
            boolean isFavorited = favoriteRepository.existsByUserAndListing(user.get(), listing.get());
            return ResponseEntity.ok().body(isFavorited);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error checking favorite status: " + e.getMessage());
        }
    }
}