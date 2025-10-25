package com.tripook.tripook_backend.repository;

import com.tripook.tripook_backend.entity.Payment;
import com.tripook.tripook_backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByBooking(Booking booking);
    List<Payment> findByStatus(Payment.Status status);
    Optional<Payment> findByTransactionCode(String transactionCode);
}