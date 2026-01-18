package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.AppUser;
import com.CodeLab.RCE_System.exception.EmailNotFoundException;
import com.CodeLab.RCE_System.exception.UserAlreadyExistsException;
import com.CodeLab.RCE_System.repository.AppUserRepository;
import com.CodeLab.RCE_System.request_dto.AppUserRegistrationRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    @Autowired
    public AuthService(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder, OtpService otpService){
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
    }

    public AppUser registerUser(AppUserRegistrationRequestDTO dto, boolean isAdmin) {

        AppUser user = appUserRepository.findByEmail(dto.getEmail()).orElse(null);

        if(user != null) {

            if (user.isEmailVerified()){
                throw new UserAlreadyExistsException("User with Email-"+dto.getEmail()+" already exists!!!");
            }

            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            return appUserRepository.save(user);
        }

        AppUser newUser = AppUser.fromDTO(dto, isAdmin);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return appUserRepository.save(newUser);
    }


    public AppUser forgetPassword(String email){
        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow(()->new EmailNotFoundException(("User with provided email not found.")));




        return appUser;
    }
}
