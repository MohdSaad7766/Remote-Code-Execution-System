package com.CodeLab.RCE_System.controller;

import com.CodeLab.RCE_System.entity.AppUser;
import com.CodeLab.RCE_System.enums.OtpPurpose;
import com.CodeLab.RCE_System.request_dto.*;
import com.CodeLab.RCE_System.response_dto.GeneralMessageResponseDTO;
import com.CodeLab.RCE_System.response_dto.LoginResponseDTO;
import com.CodeLab.RCE_System.response_dto.UserProfileResponseDTO;
import com.CodeLab.RCE_System.security.JwtService;
import com.CodeLab.RCE_System.service.AppUserService;
import com.CodeLab.RCE_System.service.AuthService;
import com.CodeLab.RCE_System.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;
    private final AppUserService appUserService;
    private final OtpService otpService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public AuthController(AuthService authService, OtpService otpService, AppUserService appUserService, AuthenticationManager authenticationManager, JwtService jwtService){
        this.authService = authService;
        this.otpService = otpService;
        this.appUserService = appUserService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register-user")
    public ResponseEntity<GeneralMessageResponseDTO> registerUser(@RequestBody @Valid AppUserRegistrationRequestDTO registrationDTO){
        AppUser appUser = authService.registerUser(registrationDTO, false);

        otpService.generateOtpForAppUserRegistration(appUser);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setSuccess(true);
        responseDTO.setMessage("OTP has been sent to your email.");

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }


    @PutMapping("/verify-email")
    public ResponseEntity<GeneralMessageResponseDTO> verifyUserEmail(@RequestBody OtpVerificationRequestDTO dto){

        otpService.verifyOtpForEmailVerification(dto);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setSuccess(true);
        responseDTO.setMessage("Otp verification successful.");
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PutMapping("/resend-otp")
    public ResponseEntity<GeneralMessageResponseDTO> resendOtp(@RequestBody ResendOtpRequestDTO dto){
        AppUser appUser = appUserService.findByEmail(dto.getEmail());

        otpService.generateOtpForAppUserRegistration(appUser);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setSuccess(true);
        responseDTO.setMessage("OTP has been sent to your email.");

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO dto){
        LoginResponseDTO responseDTO = new LoginResponseDTO(false, null, null);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );

            UserProfileResponseDTO profile = appUserService.getUserProfile(dto.getEmail());
            String token = jwtService.generateToken(dto.getEmail());

            responseDTO.setAuthenticated(true);
            responseDTO.setToken(token);
            responseDTO.setProfile(profile);

            return  ResponseEntity.ok(responseDTO);
        }
        catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseDTO);
        }
    }

    @PostMapping("/refresh-token")
    public void refreshToken(){

    }

    @PostMapping("/forget-password")
    public ResponseEntity<GeneralMessageResponseDTO> forgetPassword(@RequestBody @Valid ForgetPasswordRequestDTO dto){
        AppUser appUser = authService.forgetPassword(dto.getEmail());


        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setSuccess(true);
        responseDTO.setMessage("If the email is registered, an OTP has been sent.");

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
}
