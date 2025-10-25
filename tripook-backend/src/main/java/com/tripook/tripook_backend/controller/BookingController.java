package com.tripook.tripook_backend.controller;

import com.tripook.tripook_backend.entity.Booking;
import com.tripook.tripook_backend.repository.BookingRepository;
import com.tripook.tripook_backend.repository.ListingRepository;
import com.tripook.tripook_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingRepository.findAll();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        try {
            Optional<Booking> booking = bookingRepository.findById(id);
            if (!booking.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(booking.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            // Validate customer exists
            if (!userRepository.existsById(booking.getCustomerId())) {
                return ResponseEntity.badRequest().body("Customer not found");
            }

            // Validate listing exists
            if (!listingRepository.existsById(booking.getListingId())) {
                return ResponseEntity.badRequest().body("Listing not found");
            }

            // Set default values
            booking.setStatus(Booking.Status.PENDING);
            booking.setPaymentStatus(Booking.PaymentStatus.PENDING);
            booking.setCreatedAt(LocalDateTime.now());
            booking.setUpdatedAt(LocalDateTime.now());

            // Calculate total price based on dates and listing price
            // (This would typically involve more complex business logic)

            Booking savedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating booking: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        try {
            Optional<Booking> bookingOpt = bookingRepository.findById(id);
            if (!bookingOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Booking booking = bookingOpt.get();
            booking.setCheckInDate(bookingDetails.getCheckInDate());
            booking.setCheckOutDate(bookingDetails.getCheckOutDate());
            booking.setGuests(bookingDetails.getGuests());
            booking.setTotalPrice(bookingDetails.getTotalPrice());
            booking.setStatus(bookingDetails.getStatus());
            booking.setPaymentStatus(bookingDetails.getPaymentStatus());
            booking.setSpecialRequests(bookingDetails.getSpecialRequests());
            booking.setCancellationReason(bookingDetails.getCancellationReason());
            booking.setUpdatedAt(LocalDateTime.now());

            Booking updatedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating booking: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, @RequestBody String reason) {
        try {
            Optional<Booking> bookingOpt = bookingRepository.findById(id);
            if (!bookingOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Booking booking = bookingOpt.get();
            booking.setStatus(Booking.Status.CANCELLED);
            booking.setCancellationReason(reason);
            booking.setUpdatedAt(LocalDateTime.now());

            Booking updatedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error cancelling booking: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable Long id) {
        try {
            Optional<Booking> bookingOpt = bookingRepository.findById(id);
            if (!bookingOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Booking booking = bookingOpt.get();
            booking.setStatus(Booking.Status.CONFIRMED);
            booking.setUpdatedAt(LocalDateTime.now());

            Booking updatedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error confirming booking: " + e.getMessage());
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getBookingsByCustomer(@PathVariable Long customerId) {
        try {
            List<Booking> bookings = bookingRepository.findByCustomerId(customerId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<?> getBookingsByListing(@PathVariable Long listingId) {
        try {
            List<Booking> bookings = bookingRepository.findByListingId(listingId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}