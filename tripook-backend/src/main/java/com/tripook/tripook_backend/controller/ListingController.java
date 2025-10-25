package com.tripook.tripook_backend.controller;

import com.tripook.tripook_backend.entity.Listing;
import com.tripook.tripook_backend.repository.ListingRepository;
import com.tripook.tripook_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer guests,
            @RequestParam(required = false) String type) {
        
        try {
            Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
            
            Pageable pageable = PageRequest.of(page, size, sort);
            
            Page<Listing> listings;
            
            if (city != null || country != null || minPrice != null || maxPrice != null || 
                guests != null || type != null) {
                // Tìm kiếm với filters
                listings = listingRepository.findByFilters(
                    city, country, minPrice, maxPrice, guests, 
                    type != null ? Listing.Type.valueOf(type) : null,
                    pageable
                );
            } else {
                // Lấy tất cả listings active
                listings = listingRepository.findByStatus(Listing.Status.ACTIVE, pageable);
            }
            
            return ResponseEntity.ok(listings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getListingById(@PathVariable Long id) {
        try {
            Optional<Listing> listing = listingRepository.findById(id);
            if (!listing.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(listing.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createListing(@RequestBody Listing listing) {
        try {
            // Validate provider exists
            if (!userRepository.existsById(listing.getProviderId())) {
                return ResponseEntity.badRequest().body("Provider not found");
            }

            listing.setStatus(Listing.Status.ACTIVE);
            listing.setCreatedAt(LocalDateTime.now());
            listing.setUpdatedAt(LocalDateTime.now());
            
            Listing savedListing = listingRepository.save(listing);
            return ResponseEntity.ok(savedListing);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating listing: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateListing(@PathVariable Long id, @RequestBody Listing listingDetails) {
        try {
            Optional<Listing> listingOpt = listingRepository.findById(id);
            if (!listingOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Listing listing = listingOpt.get();
            listing.setTitle(listingDetails.getTitle());
            listing.setDescription(listingDetails.getDescription());
            listing.setAddress(listingDetails.getAddress());
            listing.setCity(listingDetails.getCity());
            listing.setCountry(listingDetails.getCountry());
            listing.setPricePerNight(listingDetails.getPricePerNight());
            listing.setMaxGuests(listingDetails.getMaxGuests());
            listing.setBedrooms(listingDetails.getBedrooms());
            listing.setBathrooms(listingDetails.getBathrooms());
            listing.setAmenities(listingDetails.getAmenities());
            listing.setType(listingDetails.getType());
            listing.setStatus(listingDetails.getStatus());
            listing.setAvailableFrom(listingDetails.getAvailableFrom());
            listing.setAvailableTo(listingDetails.getAvailableTo());
            listing.setUpdatedAt(LocalDateTime.now());

            Listing updatedListing = listingRepository.save(listing);
            return ResponseEntity.ok(updatedListing);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating listing: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteListing(@PathVariable Long id) {
        try {
            Optional<Listing> listing = listingRepository.findById(id);
            if (!listing.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            listingRepository.deleteById(id);
            return ResponseEntity.ok().body("Listing deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting listing: " + e.getMessage());
        }
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<?> getListingsByProvider(@PathVariable Long providerId) {
        try {
            List<Listing> listings = listingRepository.findByProviderId(providerId);
            return ResponseEntity.ok(listings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}