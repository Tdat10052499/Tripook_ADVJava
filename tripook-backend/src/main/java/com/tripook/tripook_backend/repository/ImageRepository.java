package com.tripook.tripook_backend.repository;

import com.tripook.tripook_backend.entity.Image;
import com.tripook.tripook_backend.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByListing(Listing listing);
    List<Image> findByListingOrderByPosition(Listing listing);
}