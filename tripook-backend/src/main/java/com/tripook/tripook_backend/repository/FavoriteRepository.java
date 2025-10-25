package com.tripook.tripook_backend.repository;

import com.tripook.tripook_backend.entity.Favorite;
import com.tripook.tripook_backend.entity.Listing;
import com.tripook.tripook_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    List<Favorite> findByListing(Listing listing);
    Optional<Favorite> findByUserAndListing(User user, Listing listing);
    boolean existsByUserAndListing(User user, Listing listing);
}