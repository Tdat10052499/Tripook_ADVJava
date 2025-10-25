package com.tripook.tripook_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
    
    @Column(length = 50)
    private String gateway;
    
    @Column(precision = 12, scale = 2, nullable = false)
    private BigDecimal amount;
    
    @Column(length = 3)
    private String currency = "VND";
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Status status = Status.PENDING;
    
    @Column(name = "transaction_code", length = 100)
    private String transactionCode;
    
    @Column(name = "callback_date")
    private LocalDateTime callbackDate;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    public enum Status {
        PENDING, SUCCESS, FAILED, CANCELLED, REFUNDED
    }
}