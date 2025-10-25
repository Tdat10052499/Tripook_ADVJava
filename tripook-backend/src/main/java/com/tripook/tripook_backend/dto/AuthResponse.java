package com.tripook.tripook_backend.dto;

import com.tripook.tripook_backend.entity.User;
import lombok.Data;

@Data
public class AuthResponse {
    private User user;
    private String token;
    private String message;
}