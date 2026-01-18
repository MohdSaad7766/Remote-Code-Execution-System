package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.enums.Role;
import com.CodeLab.RCE_System.request_dto.AppUserRegistrationRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean emailVerified;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


    @OneToOne(mappedBy = "appUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private User user;

    @OneToOne(mappedBy = "appUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Admin admin;

    public boolean isUser() {
        return role == Role.ROLE_USER;
    }

    public boolean isAdmin() {
        return role == Role.ROLE_ADMIN;
    }

    public static AppUser fromDTO(AppUserRegistrationRequestDTO dto, boolean isAdmin) {
        AppUser appUser = new AppUser();
        appUser.setEmail(dto.getEmail());
        appUser.setPassword(dto.getPassword());
        appUser.setEmailVerified(false);
        appUser.setRole(isAdmin ? Role.ROLE_ADMIN : Role.ROLE_USER);
        return appUser;
    }
}



