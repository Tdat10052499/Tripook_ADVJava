package com.tripook.tripook_backend.repository;

import com.tripook.tripook_backend.entity.Booking;
import com.tripook.tripook_backend.entity.Listing;
import com.tripook.tripook_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(User customer);
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByListing(Listing listing);
    List<Booking> findByListingId(Long listingId);
    List<Booking> findByStatus(Booking.Status status);
    
    @Query("SELECT b FROM Booking b WHERE b.customer = :customer ORDER BY b.createdAt DESC")
    List<Booking> findByCustomerOrderByCreatedAtDesc(@Param("customer") User customer);
    
    @Query("SELECT b FROM Booking b WHERE b.listing = :listing AND " +
           "((b.checkInDate BETWEEN :checkIn AND :checkOut) OR " +
           "(b.checkOutDate BETWEEN :checkIn AND :checkOut) OR " +
           "(b.checkInDate <= :checkIn AND b.checkOutDate >= :checkOut)) AND " +
           "b.status IN ('CONFIRMED', 'PENDING')")
    List<Booking> findConflictingBookings(@Param("listing") Listing listing, 
                                         @Param("checkIn") LocalDate checkIn, 
                                         @Param("checkOut") LocalDate checkOut);
}