package com.tripook.tripook_backend.repository;

import com.tripook.tripook_backend.entity.Review;
import com.tripook.tripook_backend.entity.Listing;
import com.tripook.tripook_backend.entity.User;
import com.tripook.tripook_backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByListing(Listing listing);
    List<Review> findByCustomer(User customer);
    Optional<Review> findByBooking(Booking booking);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.listing = :listing")
    Double getAverageRatingByListing(@Param("listing") Listing listing);
    
    @Query("SELECT r FROM Review r WHERE r.listing = :listing ORDER BY r.createdAt DESC")
    List<Review> findByListingOrderByCreatedAtDesc(@Param("listing") Listing listing);
}