package com.tripook.tripook_backend.dto;

import com.tripook.tripook_backend.entity.User;
import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private User.Role role;
}