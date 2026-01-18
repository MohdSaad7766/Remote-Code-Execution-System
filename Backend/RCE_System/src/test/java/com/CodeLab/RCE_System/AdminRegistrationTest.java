package com.CodeLab.RCE_System;

import com.CodeLab.RCE_System.entity.Admin;
import com.CodeLab.RCE_System.entity.AppUser;
import com.CodeLab.RCE_System.enums.Role;
import com.CodeLab.RCE_System.repository.AdminRepository;
import com.CodeLab.RCE_System.repository.AppUserRepository;
import com.CodeLab.RCE_System.request_dto.AppUserRegistrationRequestDTO;
import com.CodeLab.RCE_System.service.AuthService;
import jakarta.persistence.Table;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

//@SpringBootTest
public class AdminRegistrationTest {

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


//    @Test
    public void createAdmin(){


        if (appUserRepository.existsByEmail("saad.admin@codelab.com")) {
            return; // idempotent
        }

        AppUser appUser = new AppUser();
        appUser.setEmail("saad.admin@codelab.com");
        appUser.setPassword(passwordEncoder.encode("S@@d_1234_"));
        appUser.setRole(Role.ROLE_ADMIN);
        appUser.setEmailVerified(true);


        Admin admin = new Admin();
        admin.setName("Ansari Mohd Saad");
        admin.setPhoneNumber("+91 9175715785");

        admin.setAppUser(appUser);
        appUser.setAdmin(admin);

        appUserRepository.save(appUser);
    }
}
