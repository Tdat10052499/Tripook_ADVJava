package com.tripook.tripook_backend.controller;

import com.tripook.tripook_backend.entity.Review;
import com.tripook.tripook_backend.entity.User;
import com.tripook.tripook_backend.entity.Listing;
import com.tripook.tripook_backend.entity.Booking;
import com.tripook.tripook_backend.repository.ReviewRepository;
import com.tripook.tripook_backend.repository.UserRepository;
import com.tripook.tripook_backend.repository.ListingRepository;
import com.tripook.tripook_backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<?> getReviewsByListing(@PathVariable Long listingId) {
        try {
            Optional<Listing> listing = listingRepository.findById(listingId);
            if (!listing.isPresent()) {
                return ResponseEntity.badRequest().body("Listing not found");
            }
            
            List<Review> reviews = reviewRepository.findByListing(listing.get());
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getReviewsByCustomer(@PathVariable Long customerId) {
        try {
            Optional<User> customer = userRepository.findById(customerId);
            if (!customer.isPresent()) {
                return ResponseEntity.badRequest().body("Customer not found");
            }
            
            List<Review> reviews = reviewRepository.findByCustomer(customer.get());
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        try {
            Optional<Review> review = reviewRepository.findById(id);
            if (!review.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(review.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review reviewRequest) {
        try {
            // Validate booking exists
            Optional<Booking> booking = bookingRepository.findById(reviewRequest.getBooking().getId());
            if (!booking.isPresent()) {
                return ResponseEntity.badRequest().body("Booking not found");
            }

            // Validate listing exists
            Optional<Listing> listing = listingRepository.findById(reviewRequest.getListing().getId());
            if (!listing.isPresent()) {
                return ResponseEntity.badRequest().body("Listing not found");
            }

            // Validate customer exists
            Optional<User> customer = userRepository.findById(reviewRequest.getCustomer().getId());
            if (!customer.isPresent()) {
                return ResponseEntity.badRequest().body("Customer not found");
            }

            // Validate booking belongs to customer
            if (!booking.get().getCustomer().getId().equals(customer.get().getId())) {
                return ResponseEntity.badRequest().body("Booking does not belong to this customer");
            }

            // Validate booking is for this listing
            if (!booking.get().getListing().getId().equals(listing.get().getId())) {
                return ResponseEntity.badRequest().body("Booking is not for this listing");
            }

            // Check if review already exists for this booking
            Optional<Review> existingReview = reviewRepository.findByBooking(booking.get());
            if (existingReview.isPresent()) {
                return ResponseEntity.badRequest().body("Review already exists for this booking");
            }

            Review review = new Review();
            review.setBooking(booking.get());
            review.setListing(listing.get());
            review.setCustomer(customer.get());
            review.setRating(reviewRequest.getRating());
            review.setComment(reviewRequest.getComment());
            review.setCreatedAt(LocalDateTime.now());
            review.setUpdatedAt(LocalDateTime.now());

            Review savedReview = reviewRepository.save(review);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating review: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        try {
            Optional<Review> reviewOpt = reviewRepository.findById(id);
            if (!reviewOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Review review = reviewOpt.get();
            review.setRating(reviewDetails.getRating());
            review.setComment(reviewDetails.getComment());
            review.setUpdatedAt(LocalDateTime.now());

            Review updatedReview = reviewRepository.save(review);
            return ResponseEntity.ok(updatedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating review: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        try {
            Optional<Review> review = reviewRepository.findById(id);
            if (!review.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            reviewRepository.deleteById(id);
            return ResponseEntity.ok().body("Review deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting review: " + e.getMessage());
        }
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<?> getReviewByBooking(@PathVariable Long bookingId) {
        try {
            Optional<Booking> booking = bookingRepository.findById(bookingId);
            if (!booking.isPresent()) {
                return ResponseEntity.badRequest().body("Booking not found");
            }
            
            Optional<Review> review = reviewRepository.findByBooking(booking.get());
            if (!review.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(review.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}