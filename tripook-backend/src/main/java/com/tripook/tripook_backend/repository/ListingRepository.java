package com.tripook.tripook_backend.repository;

import com.tripook.tripook_backend.entity.Listing;
import com.tripook.tripook_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findByProvider(User provider);
    List<Listing> findByProviderId(Long providerId);
    List<Listing> findByCity(String city);
    Page<Listing> findByStatus(Listing.Status status, Pageable pageable);
    
    @Query("SELECT l FROM Listing l WHERE l.city = :city AND l.status = :status")
    List<Listing> findActiveByCityAndStatus(@Param("city") String city, @Param("status") Listing.Status status);
    
    @Query("SELECT l FROM Listing l WHERE l.pricePerNight BETWEEN :minPrice AND :maxPrice AND l.status = 'ACTIVE'")
    List<Listing> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice);
    
    @Query("SELECT l FROM Listing l WHERE l.city LIKE %:city% AND l.status = 'ACTIVE' ORDER BY l.createdAt DESC")
    List<Listing> searchByCity(@Param("city") String city);
    
    @Query("SELECT l FROM Listing l WHERE " +
           "(:city IS NULL OR LOWER(l.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
           "(:country IS NULL OR LOWER(l.country) LIKE LOWER(CONCAT('%', :country, '%'))) AND " +
           "(:minPrice IS NULL OR l.pricePerNight >= :minPrice) AND " +
           "(:maxPrice IS NULL OR l.pricePerNight <= :maxPrice) AND " +
           "(:guests IS NULL OR l.maxGuests >= :guests) AND " +
           "(:type IS NULL OR l.type = :type) AND " +
           "l.status = 'ACTIVE'")
    Page<Listing> findByFilters(@Param("city") String city,
                               @Param("country") String country,
                               @Param("minPrice") Double minPrice,
                               @Param("maxPrice") Double maxPrice,
                               @Param("guests") Integer guests,
                               @Param("type") Listing.Type type,
                               Pageable pageable);
}